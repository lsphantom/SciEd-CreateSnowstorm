import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})




export class MapContainerComponent implements OnInit {
  mb1 = 'active';
  mb2 = '';


  hps: string = 'High Pressure System:';
  lps: string = 'Low Pressure System:';

  proceedVisibility = 'hidden';

  inactiveList = [
    'high',
    'low'
  ];

  northDrop = [];
  southDrop = [];

  //Set default messages
  noDataMessage = "You must place the L and H to proceed.";
  reverseDataMessage = "Not quite. Reverse the pieces and press Go";
  successDataMessage = "Great! For an upslope snow storm, high pressure is in the north and low pressure is in the south."

  selectTempMessage = "You must select Colder or Warmer from the North, Colder or Warmer from the South, and one arrow showing the direct of moisture to proceed."
    
  ccnMessage = "You're right about the cold air from the north. But there isn't enough moisture in that air for snow. Plus, cold air from the south wouldn't lead to a big snow storm. Try again.";
  ccsMessage = "You're right about the moisture source. But you also need some warm air to help form a big snow storm. Try again.";
  wwnMessage = "You're right about the warm air in the south. But you need some cold air to produce snow and more moisture. There isn't enough moisture in the north. Try again.";
  wwsMessage = "You're right about the moisture source. But you need cold air to produce snow. Try again.";

  wcnMessage = "Warm, moist air doesn't come from the north in the northern hemisphere. And air from the south wouldn't be cold enough for snow. Try again";
  wcsMessage = "You're right about the moisture source. But warm air in the north and cold air in the south wouldn't create a snow storm. Try again";
    
  cwnMessage = "You're right about the temperatures but you need more moisture. There isn't enough in the north. Try again.";
  cwsMessage = "Nice job! You chose the right ingredients and made an upslope snow storm.";

  messageArray = [this.noDataMessage, this.reverseDataMessage, this.successDataMessage, this.selectTempMessage, this.ccnMessage, this.ccsMessage, this.wwnMessage, this.wwsMessage, this.wcnMessage, this.wcsMessage, this.cwnMessage, this.cwsMessage ];


  

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(messageId)
  {
    this.snackBar.open(this.messageArray[messageId]);
  }

  checkPressureSystems()
  {
    if (this.northDrop.length === 0 && this.southDrop.length === 0) {
      this.openSnackBar(0);
    }
    else if (this.northDrop[0] === "low"  && this.southDrop[0] === "high")
    {
      this.openSnackBar(1);
    }
    else if (this.northDrop[0] === "high"  && this.southDrop[0] === "low")
    {
      //Correct PS
      this.openSnackBar(2);
      this.proceedVisibility = '';
    }
     else
    {
      this.openSnackBar(0);
    }
  }

  drop(event: CdkDragDrop<string[]>)
  {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if (event.container.data.length === 0) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
      else {
        transferArrayItem(event.container.data, this.inactiveList, event.previousIndex, event.currentIndex);
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
    
    this.removePSLabels();
  }

  /** Remove labels for pressure systems if draggables have changed default state */
  removePSLabels() {
    this.hps = '';
    this.lps = '';
  }


  /** Do not allow manual return. */
  noReturnPredicate() {
    return false;
  }


  proceedToTemps() {
    this.proceedVisibility = 'hidden';
    this.mb1 = '';
    this.mb2 = 'active';
  }

  ngOnInit() {
  }

}
