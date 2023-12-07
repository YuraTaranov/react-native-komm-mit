module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter component name...',
  },
  {
    type: 'select',
    name: 'folder',
    message: 'Select screen folder...',
    choices: [
      'Onboarding',
      'Routes',
      'RouteDetailed',
      'Objects',
      'ObjectDetailed',
      'AboutUs',
      'Settings',
      'LanguagesList',
      'ConfirmLocation',
      'SearchCity',
      'Error404',
      'ChangeCity',
      //ADD MORE SCREENS
    ],
  },
];
