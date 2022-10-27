const studentForm = [
    {
        "label" : "Name",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Student's Name",
        "API Type" : "text"
    },
    {
        "label" : "Address",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Student's Address",
        "API Type" : "text"
    },
    {
        "label" : "Email",
        "type" : "email",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Student's Email",
        "API Type" : "text"
    },
    {
        "label" : "Roll Number",
        "type" : "text",
        "pattern" : "\\d{11}",
        "required" : true,
        "placeholder" : "Student's Roll Number",
        "API Type" : "text"
    },
    
    {
        "label" : "Stream",
        "type" : "datalist",
        "pattern":null,
        "required" : true,
        "options" : ["CSE","IT","LT"],
        "placeholder" : "Stream(CSE,IT,LT)",
        "API Type" : "text"
    },
    {
        "label" : "Semester",
        "type" : "text",
        "pattern" : "\\d{1}",
        "required" : true,
        "placeholder" : "Current Semester",
        "API Type" : "number"
    },
    {
        "label" : "CGPA",
        "type" : "text",
        "pattern" : "([0-9]*[.])?[0-9]+",
        "required" : true,
        "placeholder" : "Student's CGPA",
        "API Type" : "float"
    },
    {
        "label" : "Placement Record",
        "type" : "text",
        "pattern" : null,
        "required" : false,
        "placeholder" : "Student's Placement Record(Seperated by Commas)",
        "API Type" : "array"
    },
];


const teacherForm = [
    {
        "label" : "Name",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Teacher's Name",
        "API Type" : "text"
    },
    {
        "label" : "Email",
        "type" : "email",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Teacher's Email",
        "API Type" : "text"
    },
    {
        "label" : "Age",
        "type" : "text",
        "pattern" : "\\d{2}",
        "required" : true,
        "placeholder" : "Teacher's Age",
        "API Type" : "number"
    },

    {
        "label" : "Joined At",
        "type" : "text",
        "pattern" : "\\d{4}",
        "required" : true,
        "placeholder" : "Joining Date",
        "API Type" : "number"
    },

    {
        "label" : "Research Interests",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Research Interests(Seperated by Commas)",
        "API Type" : "array"
    },
    {
        "label" : "Subjects Assigned",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Subjects Assigned(Seperated by Commas)",
        "API Type" : "array"
    }
];

const employeeForm = [
    {
        "label" : "Name",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Employee's Name",
        "API Type" : "text"
    },
    {
        "label" : "Email",
        "type" : "email",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Employee's Email",
        "API Type" : "text"
    },
    {
        "label" : "Age",
        "type" : "text",
        "pattern" : "\\d{2}",
        "required" : true,
        "placeholder" : "Employee's Age",
        "API Type" : "number"
    },

    {
        "label" : "Joined At",
        "type" : "text",
        "pattern" : "\\d{4}",
        "required" : true,
        "placeholder" : "Joining Date",
        "API Type" : "number"
    },
    {
        "label" : "Responsibility",
        "type" : "text",
        "pattern" : null,
        "required" : true,
        "placeholder" : "Responsibility of Employee",
        "API Type" : "array"
    },
];


const URL = {
    student: "https://college-database-backend.herokuapp.com/student",
    teacher: "https://college-database-backend.herokuapp.com/teacher",
    employee: "https://college-database-backend.herokuapp.com/nonTeacher",
};
  