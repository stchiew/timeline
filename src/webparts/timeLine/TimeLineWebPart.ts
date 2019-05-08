import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import 'timelinejs3';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './TimeLineWebPart.module.scss';
import * as strings from 'TimeLineWebPartStrings';
import TimeLineMockData from './TimeLineMockData';
export interface ITimeLineWebPartProps {
  description: string;
}

export default class TimeLineWebPart extends BaseClientSideWebPart<ITimeLineWebPartProps> {
  public constructor() {
    super();

    SPComponentLoader.loadCss('//cdn.knightlab.com/libs/timeline3/latest/css/timeline.css');
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.timeLine}">
        <div id='timeline-embed' style="width: 100%; height: 600px"></div>
      </div>`;

    let events = TimeLineMockData.getData();
    var timeline = new TL.Timeline("timeline-embed", events);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getData(): any {
    return TimeLineMockData.getData();
  }

  private _getEvents(): any {
    const events = {
      "title": {
        "media": {
          "url": "//www.flickr.com/photos/tm_10001/2310475988/",
          "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
          "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
        },
        "text": {
          "headline": "Whitney Houston<br/> 1963 - 2012",
          "text": "<p>Houston's voice caught the imagination of the world propelling her to superstardom at an early age becoming one of the most awarded performers of our time. This is a look into the amazing heights she achieved and her personal struggles with substance abuse and a tumultuous marriage.</p>"
        }
      },
      events: [{
        "media": {
          "url": "https://github.com/NUKnightLab/TimelineJS3/blob/master/website/static/img/examples/houston/family.jpg?raw=true",
          "caption": "Houston's mother and Gospel singer, Cissy Houston (left) and cousin Dionne Warwick.",
          "credit": "Cissy Houston photo:<a href='http://www.flickr.com/photos/11447043@N00/418180903/'>Tom Marcello</a><br/><a href='http://commons.wikimedia.org/wiki/File%3ADionne_Warwick_television_special_1969.JPG'>Dionne Warwick: CBS Television via Wikimedia Commons</a>"
        },
        "start_date": {
          "month": "8",
          "day": "9",
          "year": "1963"
        },
        "text": {
          "headline": "A Musical Heritage",
          "text": "<p>Born in New Jersey on August 9th, 1963, Houston grew up surrounded by the music business. Her mother is gospel singer Cissy Houston and her cousins are Dee Dee and Dionne Warwick.</p>"
        }
      }]
    };

    return events;
  }
}
