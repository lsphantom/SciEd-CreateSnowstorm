import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})




export class MapContainerComponent implements OnInit {

  

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(messageId){

    //Set default messages
    let noDataMessage = "You must place the L and H to proceed.";
    let reverseDataMessage = "Not quite. Reverse the pieces and press Go";

    let selectTempMessage = "You must select Colder or Warmer from the North, Colder or Warmer from the South, and one arrow showing the direct of moisture to proceed."
    
    let ccnMessage = "You're right about the cold air from the north. But there isn't enough moisture in that air for snow. Plus, cold air from the south wouldn't lead to a big snow storm. Try again.";
    let ccsMessage = "You're right about the moisture source. But you also need some warm air to help form a big snow storm. Try again.";
    let wwnMessage = "You're right about the warm air in the south. But you need some cold air to produce snow and more moisture. There isn't enough moisture in the north. Try again.";
    let wwsMessage = "You're right about the moisture source. But you need cold air to produce snow. Try again.";

    let wcnMessage = "Warm, moist air doesn't come from the north in the northern hemisphere. And air from the south wouldn't be cold enough for snow. Try again";
    let wcsMessage = "You're right about the moisture source. But warm air in the north and cold air in the south wouldn't create a snow storm. Try again";
    
    let cwnMessage = "You're right about the temperatures but you need more moisture. There isn't enough in the north. Try again.";
    let cwsMessage = "Nice job! You chose the right ingredients and made an upslope snow storm.";

    let messageArray = [noDataMessage, reverseDataMessage, selectTempMessage, ccnMessage, ccsMessage, wwnMessage, wwsMessage, wcnMessage, wcsMessage, cwnMessage, cwsMessage ];

    this.snackBar.open(messageArray[messageId]);
  }

  ngOnInit() {
  }

}
