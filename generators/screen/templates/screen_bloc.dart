import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_event.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_state.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/event_handlers/<%= screenNameLowerCase %>__on_screen_started_event_handler.dart';
import 'package:<%= fgsUtilsPackageName %>/analytics/fgs_utils__analytics_service_cases.dart';
import 'package:<%= fgsUtilsPackageName %>/log/fgs_utils__log_service_cases.dart';
import 'package:<%= fgsUtilsPackageName %>/uuid/fgs_utils__uuid_service_cases.dart';

class <%= screenNameUpperCase %>__ScreenBloc extends Bloc<<%= screenNameUpperCase %>__ScreenEvent, <%= screenNameUpperCase %>__ScreenState> {
  final FGS_UTILS__UuidServiceCases uuidServiceCases;
  final FGS_UTILS__AnalyticsServiceCases analyticsServiceCases;
  final FGS_UTILS__LogServiceCases logServiceCases;
  
  <%= screenNameUpperCase %>__ScreenBloc({
    required <%= screenNameUpperCase %>__ScreenState initialState, 
    required this.uuidServiceCases,
    required this.analyticsServiceCases,
    required this.logServiceCases,
  }) : super(initialState) {
    on<<%= screenNameUpperCase %>__ScreenEvent>(((event, emit) async {
      await event.map(
        screenStarted: (screenStarted) => <%= screenNameUpperCase %>__onScreenStartedEventHandler(
          bloc: this,
          event: screenStarted, 
          emit: emit
        ),
      );
    }));
  }
}
