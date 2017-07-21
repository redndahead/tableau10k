(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      schemaCallback([userTableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      userGetData(table, doneCallback);
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
          var token = $('#token').val().trim();
          tableau.connectionData = token;
          tableau.connectionName = "10K Users"; // This will be the data source name in Tableau
          tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
