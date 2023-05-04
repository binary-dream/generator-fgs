<%- importPackages %>

class <%= screenNameUpperCase %>__ScreenBloc 
  extends Bloc<
    <%= screenNameUpperCase %>__ScreenEvent, 
    <%= screenNameUpperCase %>__ScreenState
  > {
  <%= screenNameUpperCase %>__ScreenBloc({
    required this.data,
    required <%= screenNameUpperCase %>__ScreenState initialState, 
    required this.uuidServiceCases,
    required this.analyticsServiceCases,
    required this.logServiceCases,
  }) : super(initialState) {
    on<<%= screenNameUpperCase %>__ScreenEvent>((event, emit) async {
      await event.map(
        screenStarted: (screenStarted) => 
          <%= screenNameUpperCase %>__onScreenStartedEventHandler(
            bloc: this,
            event: screenStarted, 
            emit: emit,
          ),
      );
    });
  }

  final <%= screenNameUpperCase %>__ScreenData data;
  final FGS_UTILS__UuidServiceCases uuidServiceCases;
  final FGS_UTILS__AnalyticsServiceCases analyticsServiceCases;
  final FGS_UTILS__LogServiceCases logServiceCases;
}
