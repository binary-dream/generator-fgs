<%- importPackages %>

class <%= screenNameUpperCase %>__Screen extends StatelessWidget with
  FGS_UTILS__NavigableWidgetMixin<
    <%= screenNameUpperCase %>__ScreenBloc, 
    <%= screenNameUpperCase %>__ScreenEvent, 
    <%= screenNameUpperCase %>__ScreenState
  >,
  FGS_UTILS__ToastMessageLauncherWidgetMixin<
    <%= screenNameUpperCase %>__ScreenBloc, 
    <%= screenNameUpperCase %>__ScreenEvent, 
    <%= screenNameUpperCase %>__ScreenState
  > {

  const <%= screenNameUpperCase %>__Screen({ 
    super.key,
    required this.data,
  });

  final <%= screenNameUpperCase %>__ScreenData data;

  @override
  Widget build(BuildContext context) {
    return BlocProvider<<%= screenNameUpperCase %>__ScreenBloc>(
      create: (context) => <%= screenNameUpperCase %>__ScreenBloc(
          data: 
            data,
          initialState: 
            const <%= screenNameUpperCase %>__ScreenState.main(),
          uuidServiceCases: 
            diContainer.get<FGS_UTILS__UuidServiceCases>(),
          analyticsServiceCases: 
            diContainer.get<FGS_UTILS__AnalyticsServiceCases>(),
          logServiceCases: 
            diContainer.get<FGS_UTILS__LogServiceCases>(),
        )
        ..add(const <%= screenNameUpperCase %>__ScreenEvent.screenStarted()),
      child: MultiBlocListener(
        listeners: [
          getNavigateToBlocListener(),
          getToastMessageBlocListener(),
        ],
        child: Scaffold(
          appBar: AppBar(),
          body: Container(),
        ),
      ),
    );
  }
}
