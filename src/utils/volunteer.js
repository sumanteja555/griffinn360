const volunteer = [
  {
    name: "userEmail",
    type: "email",
    required: true,
    label: "Email",
  },
  {
    name: "userName",
    type: "text",
    required: true,
    label: "Enter your Full Name",
  },
  {
    name: "number",
    type: "number",
    required: true,
    label: "Enter your Mobile Number",
  },
  {
    name: "profession",
    type: "text",
    required: false,
    label: "Enter your profession",
  },
  {
    name: "native",
    type: "text",
    required: false,
    label: "Native of",
  },
  {
    name: "currentResidence",
    type: "text",
    required: false,
    label: "Currently Residing at",
  },

  {
    name: "socialProfile",
    type: "text",
    required: false,
    label: "Enter your LinkedIn profile",
  },
  {
    name: "igProfile",
    type: "text",
    required: false,
    label: "Enter your instagram profile id",
  },
  {
    name: "experience",
    type: "text",
    required: true,
    label: "Enter your experience areas",
  },
  {
    name: "otherInfo",
    type: "text",
    required: false,
    label: "Inlcude anything else you want to tell us",
  },
];

export default volunteer;
