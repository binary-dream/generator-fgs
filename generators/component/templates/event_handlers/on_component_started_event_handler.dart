<%- importPackages %>

Future<void> <%= screenNameUpperCase %>__<%= componentNameUpperCase %>__onComponentStartedEventHandler({
  required <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentBloc bloc, 
  required <%= screenNameUpperCase %>__<%= componentNameUpperCase %>__ComponentStarted event, 
  required Emitter<<%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState> emit,
}) async {}
