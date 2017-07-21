var assignmentCols = [
  {
    id: "id",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "allocation_mode",
    alias: "Allocation Mode",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "percent",
    alias: "Percent",
    dataType: tableau.dataTypeEnum.float
  }, {
    id: "user_id",
    alias: "User ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "assignable_id",
    alias: "Assignable ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "ends_at",
    alias: "End Date",
    dataType: tableau.dataTypeEnum.date
  }, {
    id: "bill_rate",
    alias: "Bill Rate",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "bill_rate_id",
    alias: "Bill Rate ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "repetition_id",
    alias: "Repetition ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "creation_date",
    alias: "Creation Date",
    dataType: tableau.dataTypeEnum.datetime
  }, {
    id: "updated_at",
    alias: "Updated Date",
    dataType: tableau.dataTypeEnum.datetime
  }, {
    id: "all_day_assignment",
    alias: "All Day Assignment",
    dataType: tableau.dataTypeEnum.boolean
  }, {
    id: "resource_request_id",
    alias: "Resource Request ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "status",
    alias: "Status",
    dataType: tableau.dataTypeEnum.boolean
  }, {
    id: "project_id",
    alias: "Project ID",
    dataType: tableau.dataTypeEnum.int
  }];

var assignmentTableSchema = {
  id: "assignments",
  alias: "Assignments in 10K",
  columns: assignmentCols
};

function assignmentGetData(table, doneCallback) {
  // Get the list of projects
  var projectIDs = getProjectIDs();

  // Loop through all projects and get assignments
  for (var index = 0, len = projectIDs.length; index < len; index++) {

    // Set the current projectID
    var projectID = projectIDs[index];

    // Get the list of assignments and add them to the table.
    $.ajax({
      url: 'https://api.10000ft.com/api/v1/projects/' + projectID + '/assignments?per_page=200',
      type: 'GET',
      dataType: 'json',
      async: false,
      success: function(resp) {
        var data = resp.data,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = data.length; i < len; i++) {

          tableData.push({
            "id": data[i].id,
            "allocation_mode": data[i].allocation_mode,
            "percent": data[i].percent,
            "user_id": data[i].user_id,
            "assignable_id": data[i].assignable_id,
            "ends_at": data[i].ends_at,
            "starts_at": data[i].starts_at,
            "bill_rate": data[i].bill_rate,
            "bill_rate_id": data[i].bill_rate_id,
            "repetition_id": data[i].repetition_id,
            "created_at": data[i].created_at,
            "updated_at": data[i].updated_at,
            "all_day_assignment": data[i].all_day_assignment,
            "resource_request_id": data[i].resource_request_id,
            "status": data[i].status
          });
        }

        table.appendRows(tableData);
        doneCallback();
      },
      beforeSend: setHeader
    });
  }


}
