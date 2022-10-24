# MassageTherapyApp

This project is being built to practice some Clean Architecture principles and to help a massage therapist's clients to schedule their appointments.

## Layers

This app is separated into three main layers. Let's dive into each one of them and their internal layers.

### Domain
This is the domain layer, the innermost layer of the project. Inside of it, it will have some other smaller layers.

- Contracts
    - Here, we'll have the interfaces that we need inorder to maintain the Dependency Inversion principle.
    For example, repositories and services, that will be implemented at the next main layer

- Entities
    - They describe the business rules / business objects for the app. For example, here we'll have the UserEntity and AppointmentEntity for the app
        
- Errors
    - Here, our domain errors will be described so that we can have more control over the app errors. Will be used by the repository layer to map the errors from the datasource

- Usecases
    - The usecases are one of the most important parts of the domain layer. They will orchestrate the flow of an action and validate the business rules related to the action. For example: LoginUsecase and GetMyAppointmentsUsecase.

- Validators
    - There are many ways to have validators in the app, on this app, i chose to leave it at the domain layer, separated from the entity class so the presenter layer could use it too. 

### Infrastructure
The infrastructure layer is responsible for implementing the interfaces defined on our domain layer and to communicate with external resources, such as API's, Storage, File system, etc.

- Contracts
    - Here, we'll have the interfaces that our infrastructure layer need. For example, our datasources interfaces, so that the repositories can depend on them and not in the actual implementation

- Datasources
    - A datasource will communicate directly with the external resource and map the result to something that our app will understand. In our case, the datasource will call an API with the HttpService and, with a Mapper class, map the DTO (Data Transfer Object) to the actual entity if that is the case.
        
- Models
    - Here, we'll have the DTO's and Mapper objects for each entity

- Modules
    - Will implement all the utilities and specific services such as the StorageService, HttpService, ToastService, etc.

- Repositories
    - The repositories are responsibles for calling the datasources and handle the errors that may exist. They are called by the usecases (at the domain layer) 

### Presenter
The presenter layer is our last one. It will have all the UI part of the APP. The Angular framework will appear here (and just a bit at the infrastructure layer, cause we're using the Angular HttpClient).

- Pages
    - Here, we'll have the app UI, with all the pages and modules for each one. We'll need to inject all the dependencies for the pages, telling the page to use X usecase with Y repository and Z datasource. 

- Styles
    - This one will hold our global css stuff, such as button/input styles. 
  

