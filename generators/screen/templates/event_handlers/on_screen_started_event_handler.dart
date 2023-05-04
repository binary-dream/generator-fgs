<%- importPackages %>

Future<void> <%= screenNameUpperCase %>__onScreenStartedEventHandler({
  required <%= screenNameUpperCase %>__ScreenBloc bloc, 
  required <%= screenNameUpperCase %>__ScreenEvent__ScreenStarted event, 
  required Emitter<<%= screenNameUpperCase %>__ScreenState> emit,
}) async {
  await bloc.analyticsServiceCases.setCurrentScreen(
    screenName: ROUTES__<%= screenNameCamelCaseWithoutUnderline %>RouteName,
  );
}
