import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_bloc.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_event.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_state.dart';
import 'package:<%= packageName %>/routes.dart';

<%= screenNameUpperCase %>__onScreenStartedEventHandler({
  required <%= screenNameUpperCase %>__ScreenBloc bloc, 
  required <%= screenNameUpperCase %>__ScreenEvent__ScreenStarted event, 
  required Emitter<<%= screenNameUpperCase %>__ScreenState> emit
}) async {
  await bloc.analyticsServiceCases.setCurrentScreen(screenName: ROUTES__<%= screenNameCamelCaseWithoutUnderline %>RouteName);
}
