import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-script',
  templateUrl: './event-script.component.html',
  styleUrls: ['./event-script.component.scss']
})
export class EventScriptComponent implements OnInit {

  code: string;
  eventId: string;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // Save url parameter in variable

    this.afs.doc<any>('keys/firestore').valueChanges()
      .subscribe(
        (data: any) => {
          if (data !== undefined) {
            this.code = `/*
  Copy and use in your own script, don't forget to use firestore library: 1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw
  If you need your own service account, please create at https://console.developers.google.com/projectselector/iam-admin/serviceaccounts

  RUN Initialize()
*/

function Initialize() {
  try {
    var triggers = ScriptApp.getProjectTriggers();

    for (var i in triggers)
      ScriptApp.deleteTrigger(triggers[i]);

    ScriptApp.newTrigger("SubmitGoogleFormData")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit().create();

  } catch (error) {
    throw new Error("Please add this code in the Google Spreadsheet");
  }
}

function SubmitGoogleFormData(e) {
  if (!e) {
    throw new Error("Please go the Run menu and choose Initialize");
  }

  try {
    const data = createDataObject();
    createDocument(data);
    console.log(data);
  } catch (error) {
    Logger.log(error.toString());
  }
}

function getLastRow() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var lastCell = sheet.getRange(lastRow, lastColumn);

  return sheet.getSheetValues(lastRow, 1, 1, lastColumn);
}

function getFirstRow() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var lastColumn = sheet.getLastColumn();
  var lastCell = sheet.getRange(1, lastColumn);

  return sheet.getSheetValues(1, 1, 1, lastColumn);
}

function createDataObject() {
  const labels = getFirstRow();
  const data = getLastRow();

  var doc = {
    "event": "${this.eventId}",
  }

  for (var i in labels[0])
  {
    doc[ labels[0][i] ] = data[0][i]
  }

  return doc;
}

function createDocument(data) {
  const email = "sheet-to-firestore@kcv-backoffice.iam.gserviceaccount.com";
  const key = "${data.content}";
  const projectId = "kcv-backoffice";

  var firestore = FirestoreApp.getFirestore(email, key, projectId);

  firestore.createDocument("registrations", data)
}
      `;
          } else {
            this.code = '// Error while loading key';
          }
        },
        err => {
          console.log(err);
          this.code = '// Error while loading key';
        }
      );
  }
}
