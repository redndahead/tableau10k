(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      var cols = [
        {
          id: "id",
          dataType: tableau.dataTypeEnum.int
        }, {
          id: "archived",
          alias: "Archived",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "description",
          alias: "Description",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "guid",
          alias: "guid",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "name",
          alias: "Name",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "phase_name",
          alias: "Phase Name",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "project_code",
          alias: "Project Code",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "client",
          alias: "Client",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "project_state",
          alias: "Project State",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "starts_at",
          alias: "Project Start Date",
          dataType: tableau.dataTypeEnum.date
        }, {
          id: "ends_at",
          alias: "Project End Date",
          dataType: tableau.dataTypeEnum.date
        }, {
          id: "projectDevelopmentPhase",
          alias: "Project Development Phase",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "projectManager",
          alias: "Project Manager",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "productManager",
          alias: "Product Manager",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "strategicObjective",
          alias: "Strategic Objective",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "architectPartner",
          alias: "Architect Partner",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "internalProjectStatus",
          alias: "Internal Project Status",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "acDeck",
          alias: "AC Deck",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "pmoDeck",
          alias: "PMO Deck",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "director",
          alias: "Director",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "gsbPrioritization",
          alias: "GSB Prioritization",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "effort",
          alias: "Effort",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "beneficiary",
          alias: "Beneficiary",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "valueToSchool",
          alias: "Value To School",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "parentProgram",
          alias: "Parent Program",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "projectFolder",
          alias: "Project Folder",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "ti_ci_mi",
          alias: "TI/CI/MI",
          dataType: tableau.dataTypeEnum.string
        }, {
          id: "primaryClientContact",
          alias: "Primary Client Contact",
          dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "10kProjects",
            alias: "Projects in 10K",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.ajax({
          url: 'https://api.10000ft.com/api/v1/projects?per_page=200&fields=custom_field_values',
          type: 'GET',
          dataType: 'json',
          success: function(resp) {
            var data = resp.data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
              // Extract the custom field values.
              var customVals = extractCustomVals(data[i].custom_field_values.data);

              tableData.push({
                  "id": data[i].id,
                  "archived": data[i].archived,
                  "description": data[i].description,
                  "guid": data[i].guid,
                  "name": data[i].name,
                  "phase_name": data[i].phase_name,
                  "project_code": data[i].project_code,
                  "client": data[i].client,
                  "project_state": data[i].project_state,
                  "starts_at": data[i].starts_at,
                  "ends_at": data[i].ends_at,
                  "projectDevelopmentPhase": customVals.projectDevelopmentPhase,
                  "projectManager": customVals.projectManager,
                  "productManager": customVals.productManager,
                  "strategicObjective": customVals.strategicObjective,
                  "architectPartner": customVals.architectPartner,
                  "internalProjectStatus": customVals.internalProjectStatus,
                  "acDeck": customVals.acDeck,
                  "pmoDeck": customVals.pmoDeck,
                  "director": customVals.director,
                  "gsbPrioritization": customVals.gsbPrioritization,
                  "effort": customVals.effort,
                  "beneficiary": customVals.beneficiary,
                  "valueToSchool": customVals.valueToSchool,
                  "parentProgram": customVals.parentProgram,
                  "projectFolder": customVals.projectFolder,
                  "ti_ci_mi": customVals.ti_ci_mi,
                  "primaryClientContact": customVals.primaryClientContact
              });
            }

            table.appendRows(tableData);
            doneCallback();
          },
          beforeSend: setHeader
        });
    };

    // Add the token tot he header request.
    function setHeader(xhr) {
      xhr.setRequestHeader('Auth', tableau.connectionData);
    }

    // Extract custom values from the object.
    function extractCustomVals(customValues) {
      var customVals = {
        "projectDevelopmentPhase": "",
        "projectManager": "",
        "productManager": "",
        "strategicObjective": "",
        "architectPartner": "",
        "internalProjectStatus": "",
        "acDeck": "",
        "pmoDeck": "",
        "director": "",
        "gsbPrioritization": "",
        "effort": "",
        "beneficiary": "",
        "valueToSchool": "",
        "parentProgram": "",
        "projectFolder": "",
        "ti_ci_mi": "",
        "primaryClientContact": ""
      };
      for (var i = 0, len = customValues.length; i < len; i++) {
        var value = customValues[i].value;

        switch (customValues[i].custom_field_id) {
          case 841:
            customVals.projectDevelopmentPhase = value;
            break;
          case 842:
            customVals.projectManager = value;
            break;
          case 843:
            customVals.productManager = value;
            break;
          case 1124:
            customVals.strategicObjective = value;
            break;
          case 1175:
            customVals.architectPartner = value;
            break;
          case 1276:
            customVals.internalProjectStatus = value;
            break;
          case 1447:
            customVals.acDeck = value;
            break;
          case 1448:
            customVals.pmoDeck = value;
            break;
          case 1515:
            customVals.director = value;
            break;
          case 1530:
            customVals.gsbPrioritization = value;
            break;
          case 1531:
            customVals.effort = value;
            break;
          case 1532:
            customVals.beneficiary = value;
            break;
          case 1533:
            customVals.valueToSchool = value;
            break;
          case 1535:
            customVals.parentProgram = value;
            break;
          case 1538:
            customVals.projectFolder = value;
            break;
          case 1543:
            customVals.ti_ci_mi = value;
            break;
          case 1652:
            customVals.primaryClientContact = value;
            break;
        }
      }

      return customVals;
    }

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
          var token = $('#token').val().trim();
          tableau.connectionData = token;
          tableau.connectionName = "10K Projects"; // This will be the data source name in Tableau
          tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
