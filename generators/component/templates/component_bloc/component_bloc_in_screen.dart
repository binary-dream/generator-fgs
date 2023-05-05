<%- importPackages %>

class <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentBloc 
  extends
    Bloc<
      <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentEvent, 
      <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState
    > {
  <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentBloc({
    required this.data,
    required <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState initialState,
    required this.screenBloc, 
    required this.uuidServiceCases,
    required this.analyticsServiceCases,
    required this.logServiceCases,
  }) : super(initialState) {
    on<<%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentEvent>((event, emit) async {
      await event.map(
        componentStarted: (componentStarted) 
          => <%= screenNameUpperCase %>__<%= componentNameUpperCase %>__onComponentStartedEventHandler(
            bloc: this,
            event: componentStarted, 
            emit: emit,
          ),
      );
    });
  }

  final <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentData data;
  final <%= screenNameUpperCase %>__ScreenBloc screenBloc;
  final FGS_UTILS__UuidServiceCases uuidServiceCases;
  final FGS_UTILS__AnalyticsServiceCases analyticsServiceCases;
  final FGS_UTILS__LogServiceCases logServiceCases;
}