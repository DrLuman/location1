<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
            <StackLayout class="home-panel">
                <!--Add your page content here-->
                <Label textWrap="true" text="Play with NativeScript!" class="h2 description-label" />
                <StackLayout>
                  
                    <Button text="Show location" @tap="enableLocationServices"
                        :visibility="currentLoc.latitude ? 'collapsed' : 'visible'" />
                    <StackLayout :visibility="currentLoc.latitude ? 'visible' : 'collapsed'">
                        <Label :text="'Latitude: ' + currentLoc.latitude" />
                        <Label :text="'Longitude: ' + currentLoc.longitude" />
                        <Label> {{ calculateTotalDistance() }}</Label>
                        <Button text="Save Location" @tap="saveLocations(currentLoc)" />

                        <ListView class="list-group" for="locs in locArray"
                            @itemTap="onItemTap" style="height:1250px">
                            <v-template>
                                <FlexboxLayout flexDirection="row" class="list-group-item">
                                    <Label :text="locs.timeBetweenPrev" />
                                    <Label :text="locs.distBetweenPrev" />
                                    <!--Label :text="locs.latitutde" class="list-group-item-heading" />
                                    <Label :text="locs.longitude" class="list-group-item-heading"/>
                                    
									                  <Label :text="locs.timestamp" class="list-group-item-heading"
                                        style="width: 80%" />-->
                                </FlexboxLayout>
                            </v-template>
                            </ListView>
                        </StackLayout>
                      </StackLayout>
                    </StackLayout>
        </ScrollView>
    </Page>
</template>


<script >
  import format from 'date-fns/format';
  import distanceInWords from 'date-fns/distance_in_words'
import { totalmem } from 'os';
  const geoLocation = require("nativescript-geolocation");

  
  export default {
    data() {
      return {
        locArray: [{}],
        geoLoc_wrapped:{},
        currentLoc:{},
        totalDistance: 0,
        result: 'blah'
      }
    },
  methods: {
    onItemtap: function(args){
      //console.log("Item with index: " + args.index + " tapped");
    },

    enableLocationServices: function(){
      geoLocation.isEnabled().then(enabled => {
        if (!enabled) {
          geoLocation.enableLocationRequest().then(() => this.showLocation());
        }
        else {
          this.showLocation();
        }
      })
    },
    showAlert: function(currentLoc){
      let lat = c
    },

    showLocation: function (loc) {  //this method refershes location
      geoLocation.watchLocation(
        location => {
          //console.log(location);
          
          this.currentLoc = location;
          let dist = this.calculateDistance(location);
          this.locArray.push({
            obj_loc: location,
            distBetweenPrev: dist,
            timeBetweenPrev: this.calculateTime(location),
          });  //pushes each ping to the array
          this.totalDistance += dist;
        },
        error => {
          alert(error);
        }, {
          desiredAccuracy: 50,  //in meters how .. tried using Accuracy.any and Accuracy.high and it did't like 
          updateDistance: 100,  //also in meters
          minimumUpdateTime: 6000 //in miliseconds.. this is a max .. based on the values for accuracy and distance
        }
      );
    },
    saveLocations: function(loc){
      this.showLocation(loc);  //refreshes location
      //this.locArray.push(loc);
    },

  calculateDistance: function(loc2){
    //console.log("*$&&%*&$**#*****88 " + loc2.timestamp);
    if(this.locArray.length > 1){
      this.result = geoLocation.distance(
            loc2,
            this.locArray[this.locArray.length-1].obj_loc
          )
    }
    else
      this.result = 0; 
  return this.result;  //format(new Date(this.currentLoc.timestamp), 'dddd')
  },

  calculateTime: function(loc2){
    if(this.locArray.length > 1){
      this.result = distanceInWords(
            loc2.timestamp,
            this.locArray[this.locArray.length-1].obj_loc.timestamp,
            {includeSeconds: true}
          )}
    else  
      this.result = '';
    this.calculateTotalDistance();
    return this.result;  //format(new Date(this.currentLoc.timestamp), 'dddd')
  },
  calculateTotalDistance: function(){
  //   let totalDistance = 0;
  //   for(let i = 0; i < this.locArray.length; i++){
  //     console.log(this.locArray[i].distBetweenPrev);
  //     totalDistance += this.locArray[i].distBetweenPrev;
  //   }
    return this.totalDistance;
  },

},
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
