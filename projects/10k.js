(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      schemaCallback([projectTableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
      projectGetData(table, doneCallback);
    };

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
