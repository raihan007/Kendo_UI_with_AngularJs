app.controller('StudentController', ['$scope','$http','$filter','Guid', function($scope,$http,$filter,Guid) {
    $scope.AllData = {};
    var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service";
    $scope.MedicinList = [
        {ID:"287faec0-8043-c2e3-e801-d6c9892b6214", Name:"Napa"},
        {ID:"d4faa6d1-6b09-433b-9448-32b8f70ce072", Name:"HPlus"},
        {ID:"68ccaecb-df4a-44e9-af30-c3a76146c40c", Name:"Napa Extra"},
        {ID:"0c9ce154-ff4d-49a8-9ae0-bbdc7be08502", Name:"Duet"},
        {ID:"b31b42b5-46e0-49bd-bf61-7cdf908091c3", Name:"A"},
        {ID:"da15910f-f4f1-4486-9122-5147e32f7db2", Name:"B"}
    ];
    $scope.MdataSource = new kendo.data.DataSource({
                batch: true,
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { type: "number" },
                            ProductName: { type: "string" }
                        }
                    }
                }
    });
    $scope.MultiSelectDataSource = new kendo.data.DataSource({
        transport: {
            read:function(o){
                o.success($scope.MedicinList);
            }
        },
        schema: {
            model: {
                id: "ID",
                fields: {
                    ID: { type: "string" },
                    Name: { type: "string" }
                }
            }
        }
    });

    $scope.addNew = function(widgetId, value){
        var widget = $("#" + widgetId).getKendoMultiSelect();
        var dataSource = widget.dataSource;
        if (confirm("Are you sure?")) {
            var mID = Guid.newGuid();
            dataSource.add({
                ID: mID,
                Name: value
            });
            dataSource.one("sync", function() {
                widget.value(widget.value().concat([mID]));
            });
            dataSource.sync();
        }
    };


    $scope.DemoCommand = function(){
        console.log($scope.selectedIds);
    };

    /*$scope.MultiSelectDataSource = new kendo.data.DataSource({
        transport: {
            read:{
                url: 'http://localhost/kendo/app/MedicinData.json',
                dataType: "json"
            }
        },
        schema: {
            data:"MedicineList",
            model: {
                id: "ID",
                fields: {
                    ID: { type: "number" },
                    Name: { type: "string" }
                }
            }
        }
    });*/
    $scope.selectedIds = [];

    $scope.selectOptions = {
        placeholder: "Select products...",
        dataTextField: "Name",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: false,
        dataSource: $scope.MultiSelectDataSource,
        noDataTemplate: $("#noDataTemplate").html()
    };


    $scope.SearchKey = '';
    $scope.Init = function(){
        $scope.LoadJsonFileData();
    }

    $scope.LoadJsonFileData = function(){
        $scope.route = 'app/allData.json';
        $http.get($scope.route).success(function(data){
            $scope.AllData = data;
        })
        .error(function(data){
            console.log("Error getting data from ");
        });  
    }

    var emptyGuid = '00000000-0000-0000-0000-000000000000';
    $scope.Student = {
        EntityNo: 0,
        UserId: '00000000-0000-0000-0000-000000000000',
        Name: '',
        Email:'',
        Department: '',
        DateOfBirth: null,
        Experience : 0
    };

    $scope.s1 = [];

    $scope.DepartmentDataSource = new kendo.data.DataSource({
        transport: {
            read:{
                url: 'http://localhost/kendo/app/allData.json',
                dataType: "json"
            }
        },
        schema: {
            data: "DepartmentList",
            model: { 
                id: "ID",  
                fields: {
                    ID: { type: "number" },
                    Name: { type: "string" }
                }
            }
        }
    });

    $scope.DepartmentOptions = {
        dataSource: $scope.DepartmentDataSource,
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "Select a department...",
            ID: ""
        }
    };

    $scope.TestOptions = {
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "See Department Student",
            ID: ""
        }
    };

    $scope.ExperienceList = [
        {"ID":"0", "Name":"NO"},
        {"ID":"1", "Name":"YES"}
    ];

    $scope.ExperienceOptions = {
        dataSource:{
            data: $scope.ExperienceList
        },
        dataTextField: "Name",
        dataValueField: "ID",
        optionLabel: {
            Name: "Has Any Experience",
            ID: ""
        }
    };

    $scope.TestDataSource = new kendo.data.DataSource({
        transport: {
            read: function(o){
                o.success($scope.s1);
            }
        },
        schema: {
            model: { 
                id: "ID",  
                fields: {
                    ID: { type: "number" },
                    Name: { type: "string" }
                }
            }
        }
    });

    $scope.onChange = function() {
        var val = $scope.Student.Department;
        $scope.s1 = $filter('filter')($scope.StudentGridDataSource.data(), {Department: val});
        $scope.TestDataSource.read();
    }

    $scope.extraPart = function() {
        var val = $scope.Student.Experience;
        var element = $('#CompanyName');
        if(val == 1){
            element.prop('required', true);
        }else{
            element.prop('required', false);
        }
    }


    $scope.StudentList = [
        {"ID":0, "Name": "A", "Department": 1, "Email":"A@gmail.com", "DateOfBirth":"1992-08-10"},
        {"ID":1, "Name": "B", "Department": 2, "Email":"B@gmail.com", "DateOfBirth":"1992-08-10"},
        {"ID":2, "Name": "C", "Department": 3, "Email":"C@gmail.com", "DateOfBirth":"1992-08-10"},
        {"ID":3, "Name": "D", "Department": 1, "Email":"D@gmail.com", "DateOfBirth":"1992-08-10"}
    ];


    $scope.StudentGridDataSource = new kendo.data.DataSource({
        transport: {
            read:{
                url: 'http://localhost/kendo/app/allData.json',
                dataType: "json"
            }
        },
        pageSize: 5, //page size
        schema: {
            data: "StudentList",
            model: { 
                id: "UserId",
                fields: {
                    EntityNo: { type: "number" },
                    UserId: { type: "string" },                    
                    Name: { type: "string" },
                    Email: { type: "string" },
                    Department: { type: "number" },
                    DateOfBirth: { type: "date" }
                }
            }
        }
    });

    $scope.StudentGridOptions = {
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            pageSizes: [5,10,20,"all"],
            refresh: true,
            numeric: false
        },
        dataBound: function (e) {

            var grid = $("#testgrid").data("kendoGrid");
            var pageData = grid.dataSource.view();

            for (var i = 0; i < pageData.length; i++) {
                if ($scope.Student != undefined){
                    if (pageData[i].ID == $scope.Student.UserId) {
                    grid.select("tr:eq(" + i + ")");
                    break;
                    }
                }
            }
        },
        selectable: "single",
        columns: [
            { field: "EntityNo" },
            { field: "Name" },
            { field: "Email" },
            { field: "Department" }, 
            {
              field: "DateOfBirth",
              title: "Birthdate",
              template: "#= kendo.toString(kendo.parseDate(DateOfBirth, 'yyyy-MM-dd'), 'dd/MM/yyyy') #"
            }
        ]
    };

    $scope.DateOfBirthOptions = {
        format: "dd-MM-yyyy",
        parseFormats: ["yyyy-MM-dd"]
    };

    $scope.DateOpen = function (id) {
        $('#'+ id).data('kendoDatePicker').open();
    }
    
    $scope.SaveCommand = function($event) {
        event.preventDefault();
    
        if (!$scope.validator.validate()) {

            var data = {
                Messages: ["Please fill up required fields."],
            };
            showErrorMessage(data);
            return;
        }

        /*if($scope.Student.UserId != emptyGuid) {
            var data = {
                    Messages: ["This Student already exists!"],
                };
                showErrorMessage(data);
                return;
        }*/

        $scope.Student.UserId = Guid.newGuid();
        $scope.StudentGridDataSource.add($scope.Student);
        var data = {
            Messages: ["Successfully Saved"],
        };
        showSuccessMessage(data);
        $scope.NewCommand();
    };

    $scope.GetIndex = function(DataSource){
        var dataIndex = _.findIndex(DataSource, function (o) {
            return o.UserId == $scope.Student.UserId;
        });    
    };

    $scope.GridRowClick = function (data, dataItem) {
        angular.copy(data, $scope.Student);
        $scope.GridStudent = data;
        $scope.onChange();
        $scope.extraPart();
    };

    $scope.RefreshCommand = function() {
        var grid = $("#testgrid").data("kendoGrid");
        grid.clearSelection();
        $scope.NewCommand();
        $scope.StudentGridDataSource.read();
    }

    
    $scope.DeleteCommand = function() {
        var DataSource = $scope.StudentGridDataSource.data();
        var index = _.findIndex(DataSource, function (o) {
            return o.UserId == $scope.Student.UserId;
        });
        if (index != -1) {
            //DataSource[index] = $scope.Student;
            $scope.StudentGridDataSource.remove($scope.Student);
            //$scope.StudentGridDataSource.data().splice(index, 1);
            $scope.NewCommand();
        }
    }

    $scope.GetDataById = function(id) {
      var total = $scope.StudentGridDataSource.total();
      var data = dataSource.data();
        for (var i = 0; i < total; i++) {
          if(data[i].UserId === id){
            return i;
          }
        }
      return null;
    }

    $scope.edit = function(id) {
        for(i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                $scope.newcontact = angular.copy($scope.contacts[i]);
            }
        }
    }

    $scope.SearchCommand = function() {    
        $scope.StudentGridDataSource.filter({
               logic: "or",
               filters: [
                    {
                        field: "EntityNo",
                        operator: "eq",
                        value: $scope.SearchKey
                    },
                    {
                        field: "Name",
                        operator: "Contains",
                        value: $scope.SearchKey
                    },
                    {
                        field: "Email",
                        operator: "Contains",
                        value: $scope.SearchKey
                    }
                ]
        });
    };

    $scope.NewCommand = function() {
        $scope.Student = {
            EntityNo: 0,
            UserId: '00000000-0000-0000-0000-000000000000',
            Name: '',
            Email:'',
            Department: '',
            DateOfBirth: null,
            Experience : 0
        };
        $scope.HideErrorMessages();
        $scope.s1 = [];
        $scope.TestDataSource.read();
    };

    $scope.HideErrorMessages = function() {
      $scope.validator.hideMessages();
    };

    $scope.UpdateCommand = function() {
        var DataSource = $scope.StudentGridDataSource.view();
        var index = _.findIndex(DataSource, function (o) {
            return o.UserId == $scope.Student.UserId;
        });
        if (index != -1) {
            $scope.StudentGridDataSource.data().splice(index, 1);
            $scope.StudentGridDataSource.insert(index,$scope.Student);
            angular.copy($scope.Student, $scope.GridStudent);
        }
    }
}]);