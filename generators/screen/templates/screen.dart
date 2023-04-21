import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_bloc.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_state.dart';
import 'package:<%= packageName %>/screens/<%= screenNameLowerCase %>/<%= screenNameLowerCase %>__screen_event.dart';
import 'package:<%= fgsUtilsPackageName %>/navigable_widget/fgs_utils__navigable_widget_mixin.dart';
import 'package:<%= fgsUtilsPackageName %>/toast_message_launcher_widget/fgs_utils__toast_message_launcher_widget_mixin.dart';

class <%= screenNameUpperCase %>__Screen extends StatelessWidget with
  FGS_UTILS__NavigableWidgetMixin<<%= screenNameUpperCase %>__ScreenBloc, <%= screenNameUpperCase %>__ScreenEvent, <%= screenNameUpperCase %>__ScreenState>,
  FGS_UTILS__ToastMessageLauncherWidgetMixin<<%= screenNameUpperCase %>__ScreenBloc, <%= screenNameUpperCase %>__ScreenEvent, <%= screenNameUpperCase %>__ScreenState> {

  const <%= screenNameUpperCase %>__Screen({ 
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<<%= screenNameUpperCase %>__ScreenBloc>(
      create: (context) => <%= screenNameUpperCase %>__makeScreenBloc(
        context: context,
        exerciseId: exerciseId,
      )..add(const <%= screenNameUpperCase %>__ScreenEvent.screenStarted()),
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
