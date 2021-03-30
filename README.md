
# Bootstrap pages for MAGICODE

This project was created to provide a quick and easy way to generate images and corresponding DSL code for the training of MAGICODE, a customised version of Tony Beltramelli's [pix2code](https://github.com/tonybeltramelli/pix2code). 

While his project includes an extensive dataset for training the neural network on screenshots of web-pages, I wanted to expand the number of elements found in these (e.g. text inputs, checkboxes etc.)
The system, for now, is only capable of including text-inputs, checkboxes and radio boxes on top of the pre-existing elements found in pix2code web datasets. The code, however, is written in a flexible way to easily allow for further elements.

The system gives you the option to customise the number of elements, rows and cards generated...

![First screenshot of Setting pages](screenshot_1.png?raw=true "Customise the number of elements")

as well as automatically reload the page (to generate a new set of elements), save a screenshot and corresponding .gui file...

![Second screenshot of Setting pages](screenshot_2.png?raw=true "Automatically save screenshots and DSL code")

-----------------------------------------------------------------------------------------------------------------

#### Extra information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
