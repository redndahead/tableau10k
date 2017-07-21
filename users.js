var userCols = [
  {
    id: "id",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "first_name",
    alias: "First Name",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "last_name",
    alias: "Last Name",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "archived",
    alias: "Archived",
    dataType: tableau.dataTypeEnum.bool
  }, {
    id: "display_name",
    alias: "Display Name",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "email",
    alias: "Email",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "user_type_id",
    alias: "User Type ID",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "billable",
    alias: "Billable",
    dataType: tableau.dataTypeEnum.bool
  }, {
    id: "hire_date",
    alias: "Hire Date",
    dataType: tableau.dataTypeEnum.date
  }, {
    id: "termination_date",
    alias: "Termination Date",
    dataType: tableau.dataTypeEnum.date
  }, {
    id: "mobile_phone",
    alias: "Mobile Phone",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "office_phone",
    alias: "Office Phone",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "deleted_at",
    alias: "Deleted Date",
    dataType: tableau.dataTypeEnum.date
  }, {
    id: "deleted",
    alias: "Deleted",
    dataType: tableau.dataTypeEnum.bool
  }, {
    id: "account_owner",
    alias: "Account Owner",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "invitation_pending",
    alias: "Invitation Pending",
    dataType: tableau.dataTypeEnum.bool
  }, {
    id: "user_settings",
    alias: "User Settings",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "guid",
    alias: "GUID",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "billability_target",
    alias: "Billability Target",
    dataType: tableau.dataTypeEnum.int
  }, {
    id: "billrate",
    alias: "Bill Rate",
    dataType: tableau.dataTypeEnum.float
  }, {
    id: "role",
    alias: "Role",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "discipline",
    alias: "Discipline",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "location",
    alias: "Location",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "created_at",
    alias: "Created Date",
    dataType: tableau.dataTypeEnum.datetime
  }, {
    id: "updated_at",
    alias: "Updated Date",
    dataType: tableau.dataTypeEnum.datetime
  }, {
    id: "has_login",
    alias: "Has Login",
    dataType: tableau.dataTypeEnum.bool
  }, {
    id: "login_type",
    alias: "Login Type",
    dataType: tableau.dataTypeEnum.string
  }, {
    id: "archived_at",
    alias: "Archived Date",
    dataType: tableau.dataTypeEnum.datetime
  }, {
    id: "thumbnail",
    alias: "Thumbnail",
    dataType: tableau.dataTypeEnum.string
  }];

var userTableSchema = {
  id: "users",
  alias: "Users in 10K",
  columns: userCols
};

function userGetData(table, doneCallback) {
  var nextURL = '/api/v1/users?per_page=100';
  var paging = {};
  while (nextURL) {
    $.ajax({
      url: 'https://api.10000ft.com' + nextURL,
      type: 'GET',
      dataType: 'json',
      async: false,
      success: function(resp) {
        var data = resp.data,
            tableData = [];
        paging = resp.paging;

        // Iterate over the JSON object
        for (var i = 0, len = data.length; i < len; i++) {

          tableData.push({
            "id": data[i].id,
            "first_name": data[i].first_name,
            "last_name": data[i].last_name,
            "archived": data[i].archived,
            "display_name": data[i].display_name,
            "email": data[i].email,
            "user_type_id": data[i].user_type_id,
            "billable": data[i].billable,
            "hire_date": data[i].hire_date,
            "termination_date": data[i].termination_date,
            "mobile_phone": data[i].mobile_phone,
            "office_phone": data[i].office_phone,
            "deleted_at": data[i].deleted_at,
            "deleted": data[i].deleted,
            "account_owner": data[i].account_owner,
            "invitation_pending": data[i].invitation_pending,
            "user_settings": data[i].user_settings,
            "guid": data[i].guid,
            "employee_number": data[i].employee_number,
            "billability_target": data[i].billability_target,
            "billrate": data[i].billrate,
            "role": data[i].role,
            "discipline": data[i].discipline,
            "location": data[i].location,
            "created_at": data[i].created_at,
            "updated_at": data[i].updated_at,
            "has_login": data[i].has_login,
            "login_type": data[i].login_type,
            "archived_at": data[i].archived_at,
            "thumbnail": data[i].thumbnail
          });
        }

        table.appendRows(tableData);
        doneCallback();
      },
      beforeSend: setHeader
    });

    if ("next" in paging) {

      nextURL = paging.next;
    }
    else {
      nextURL = false;
    }
  }
}
