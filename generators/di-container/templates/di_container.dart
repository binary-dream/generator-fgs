<%- importPackages %>

final diContainer = GetIt.instance;

void setupDiContainer(Environment environment) {
  setupDiContainerServices(diContainer, environment);
  setupDiContainerServicesCases(diContainer, environment);
}
