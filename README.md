# Tiny Angular Applications

Tiny progressive web applications built with Angular.

| Application                                      | Description                |
|--------------------------------------------------|----------------------------|
| [Leveler](https://ziv.github.io/ngapps/leveler/) | Leveler for mobile devices |
| [Compass](https://ziv.github.io/ngapps/compass/) | Compass for mobile devices |

## Development

### Create a new application

1. Using Angular CLI, create a new application:
   ```shell
   ng new my-app -s -t
   ```
2. Add the application to the `build.sh` script.
3. Add Angular dependencies to the new application:
   ```shell
   ng add @angular/material --project=my-app
   ng add @angular/pwa --project=my-app
   ```
