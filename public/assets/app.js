var app = angular.module('app',[]);

app.directive('newscheduleitem', function() {
    return {
        // can be used as attribute or element
        restrict: 'AE',
        // which markup this directive generates
        template: '<div class="new-schedule-item">' +
            '<span>{{dict.schedule.campaign}}:&nbsp;</span>'+
            '<select class="campaign-name-dd" ng-model="selectedTestAccount" ng-options="campaign.name for campaign in campaigns">' +
            '<option value="">{{dict.schedule.selectCampaign}}</option>' +
            '</select>' +
            '<span>{{dict.schedule.startTime}}:&nbsp;</span>'+
            '<select class="campaign-name-dd" ng-model="selectedTestAccount" ng-options="campaign.name for campaign in campaigns">' +
            '<option value="">{{dict.schedule.selectCampaign}}</option>' +
            '</select>' +
            '<span>{{dict.schedule.endTime}}:&nbsp;</span>'+
            '<select class="campaign-name-dd" ng-model="selectedTestAccount" ng-options="campaign.name for campaign in campaigns">' +
            '<option value="">{{dict.schedule.selectCampaign}}</option>' +
            '</select>' +
            '<button ng-click="createCampaign()">{{dict.schedule.createCampaign}}'+
            '</button>'+
            '</div>'
    };
});