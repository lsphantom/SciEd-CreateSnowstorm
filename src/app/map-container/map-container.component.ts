import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { delay } from 'q';


@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})




export class MapContainerComponent implements OnInit {
  //Drag and Drop Killswitch
  draggingDisabled: boolean = false;

  //Drag and Drop Arrays
  inactiveList = [
    'high',
    'low'
  ];
  northDrop = [];
  southDrop = [];

  //Map Backgrounds
  mb1 = 'active';
  mb2 = ''; //includes and deactivates border on drop zones (dashed circles).

  //Map Overlays
  mo1 = ''; //north cold
  mo2 = ''; //north warm
  mo3 = ''; //south cold
  mo4 = ''; //south warm

  //Temp Selections
  selectedTempNorth = '';
  selectedTempSouth = '';

  //Moisture Selection
  selectedMoistDirection = '';
  northArrowState = '';
  southArrowState = '';

  //Stage 1 Dynamic Content Displays
  hps: string = 'High Pressure System:';
  lps: string = 'Low Pressure System:';
  proceedVisibility = 'hidden';
  stageOneContent = '';

  //Stage 2 Dynamic Content Displays
  northTempSelect = 'hidden';
  southTempSelect = 'hidden';
  procceedVisibilityTwo = 'hidden';

  //Stage 3 Dynamic Content Displays
  visibilityThree = 'hidden';
  sfa1 = '';
  sfa2 = '';
  sfa3 = '';
  sfa4 = '';
  sfa5 = '';
  

  //Snackbar Messages
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
  
  //Snackbar Messages Array (size:11)
  messageArray = [this.noDataMessage, this.reverseDataMessage, this.successDataMessage, this.selectTempMessage, this.ccnMessage, this.ccsMessage, this.wwnMessage, this.wwsMessage, this.wcnMessage, this.wcsMessage, this.cwnMessage, this.cwsMessage ];

  //Functions
  openSnackBar(messageId)
  {
    this.snackBar.open(this.messageArray[messageId], "x", {duration: 10000});
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
      else if (event.container.data.length === 1) {
        if (event.container.id === 'cdk-drop-list-1') {
          transferArrayItem(event.previousContainer.data, event.container.data, 1, 0);
          transferArrayItem(event.container.data, this.southDrop, 1, 0);
        } else {
          transferArrayItem(event.previousContainer.data, event.container.data, 1, 0);
          transferArrayItem(event.container.data, this.northDrop, 1, 0);
        }        
      }
    }
    this.removePSLabels();
  }

  //Stage 1: Check Pressure Systems
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
      //Correct Selections
      //this.openSnackBar(2);
      this.proceedVisibility = '';
    }
     else
    {
      this.openSnackBar(0);
    }
  }

  //Stage 2: Check Temps and Moisture TODO:Add blank moisture cases
  checkTempMoisture()
  {
    if (this.selectedTempNorth === "cold" && this.selectedTempSouth === 'warm') {
      if (this.selectedMoistDirection === "south") {
        //Correct Selections
        this.showSuccessContent();
      } else if (this.selectedMoistDirection == "north") {
        this.openSnackBar(10);
      } else {
        this.openSnackBar(3);
      }
    }
    else if (this.selectedTempNorth === "warm" && this.selectedTempSouth === 'cold')
    {
      if (this.selectedMoistDirection === "south") {
        this.openSnackBar(9);
      } else if (this.selectedMoistDirection == "north") {
        this.openSnackBar(8);
      } else {
        this.openSnackBar(3);
      }
    }
    else if (this.selectedTempNorth === "warm" && this.selectedTempSouth === 'warm')
    {
      if (this.selectedMoistDirection === "south") {
        this.openSnackBar(7);
      } else if (this.selectedMoistDirection == "north") {
        this.openSnackBar(6);
      } else {
        this.openSnackBar(3);
      }
    }
    else if (this.selectedTempNorth === "cold" && this.selectedTempSouth === 'cold')
    {
      if (this.selectedMoistDirection === "south") {
        this.openSnackBar(5);
      } else if (this.selectedMoistDirection == "north") {
        this.openSnackBar(4);
      } else {
        this.openSnackBar(3);
      }
    }
     else
    {
      this.openSnackBar(3);
    }
  }

  //Stage 3: Show animations and additional info
  showSuccessContent ()
  {
    //this.openSnackBar(11);
    this.visibilityThree = '';
    this.snowAnimation.togglePlayVideo();

    //delay this operation to see it animate
    setTimeout(() => {
      this.sfa1 = 'ani';
      this.sfa2 = 'ani';
      this.sfa3 = 'ani';
      this.sfa4 = 'ani';
      this.sfa5 = 'ani';
    }, 500);
    
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
    this.stageOneContent = 'hidden';
    this.mb1 = '';
    this.mb2 = 'active';
    this.disableDragging();
    this.snackBar.dismiss();
    this.northTempSelect = '';
  }

  disableDragging() {
    this.draggingDisabled = true;
  }
  
  selectNorthTemp(temp) {
    this.selectedTempNorth = temp;
    this.setMapOverlays();
    this.southTempSelect = '';
  }

  selectSouthTemp(temp) {
    this.selectedTempSouth = temp;
    this.setMapOverlays();
    this.procceedVisibilityTwo = '';
  }

  selectMoistureDirection(dir) {
    this.selectedMoistDirection = dir;
    this.deactivateInverseArrow();
  }

  deactivateInverseArrow() {
    if (this.selectedMoistDirection === 'north') {
      this.southArrowState = 'deactivated';
      this.northArrowState = 'active';
    }
    else {
      this.northArrowState = 'deactivated';
      this.southArrowState = 'active';
    }
  }

  setMapOverlays() {
    //one switch statement for north
    switch (this.selectedTempNorth) {
      case 'cold':
        this.mo1 = 'active';
        this.mo2 = '';
      break;

      case 'warm':
        this.mo2 = 'active';
        this.mo1 = '';
      break;

      default:
        this.mo1 = '';
        this.mo2 = '';
      break;
    }

    //one switch statement for south
    switch (this.selectedTempSouth) {
      case 'cold':
        this.mo3 = 'active';
        this.mo4 = '';
      break;

      case 'warm':
        this.mo4 = 'active';
        this.mo3 = '';
      break;

      default:
        this.mo3 = '';
        this.mo4 = '';
      break;
    }
  }


  constructor(private snackBar: MatSnackBar) { }

  @ViewChild('snowAni', null) snowAnimation;

  ngOnInit() {}

}
