angular.module('app')
.controller('ViewCtrl', function($scope, Caps) {
  this.viewDetails = (cap) => {
    console.log(cap.contents, '>>>>>>>>>>');
  	// Work around for rendering dynamic content to modal by using jquery
  	$('.modalBodyBorder').on('click', function(event) {
  		$scope.chosenIndex = event.currentTarget.id;

      if(cap.contents[$scope.chosenIndex].videoKey){
        $('#viewModal').html(
           `<div class="modal-dialog" id="viewModalDialog">
          <div class="modal-content" id="viewModalContent"> 
            <div class="modal-header">
              <button type="button" class="btn close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">${cap.capsuleName}</h4>
            </div>
            <div class="viewModal-body secondary-text-color" id="viewModalBody">
           
                <h4>${cap.contents[$scope.chosenIndex].name}</h4>
                <p id="viewDetails">${cap.contents[$scope.chosenIndex].input}</p>
                <video id="view-video" controls autoplay>
                  <source src="https://s3.amazonaws.com/bchilds-greenfield-legacy-timecapsule/${cap.contents[$scope.chosenIndex].videoKey}">
                </video>
            </div>
          </div>
        </div>`
        );
      } else {
  	    $('#viewModal').html(
  	       `<div class="modal-dialog" id="viewModalDialog">
  			  <div class="modal-content" id="viewModalContent"> 
  			    <div class="modal-header">
  			      <button type="button" class="btn close" data-dismiss="modal">&times;</button>
  			      <h4 class="modal-title">${cap.capsuleName}</h4>
  			    </div>
  			    <div class="viewModal-body secondary-text-color" id="viewModalBody">
  		     
       	    	  <h4>${cap.contents[$scope.chosenIndex].name}</h4>
       	    	  <p id="viewDetails">${cap.contents[$scope.chosenIndex].input}</p>
  			    
  			    </div>
  			  </div>
  			</div>`
  	    );
      }
  	})
  }

  this.viewCapsule = (cap) => {
  	// Work around for rendering dynamic content to modal by using jquery
    $('#viewModal').html(
    	`<div class="modal-dialog" id="viewModalDialog">
		  <div class="modal-content" id="viewModalContent"> 
		    <div class="modal-header">
		      <button type="button" class="btn close" data-dismiss="modal">&times;</button>
		      <h4 class="modal-title">${cap.capsuleName}</h4>
		    </div>
		    <div class="viewModal-body secondary-text-color" id="viewModalBody">
		    </div>
		  </div>
		</div>`
    );

    for (var i = 0; i < cap.contents.length; i++) {
      //this is the momento render
      if(cap.contents[i].videoKey) {
        $('.viewModal-body').append(
            `<div class="modalBodyBorder" id="${i}">
            <h4>${cap.contents[i].name}</h4>
            <p class="momentoInput">${cap.contents[i].input}</p>
            <video id="view-video" controls>
              <source src="https://s3.amazonaws.com/bchilds-greenfield-legacy-timecapsule/${cap.contents[i].videoKey}">
            </video>
          </div>`
          )
      } else {
        $('.viewModal-body').append(
        	  `<div class="modalBodyBorder" id="${i}">
  	    	  <h4>${cap.contents[i].name}</h4>
  	    	  <p class="momentoInput">${cap.contents[i].input}</p>
      	  </div>`
         )
      }
    }
  } 
})
.component('viewPage', {
  controller: 'ViewCtrl',

  bindings: {
  	cap: '<',
  	editCapsule: '=',
  	init: '<',
  	deleteCap: '=',
  	index: '<'
  },

  templateUrl: '../templates/view.html'
})