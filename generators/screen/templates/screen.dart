import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:pumpfy_app/modules/exercise_details/exercise_details__screen_bloc.dart';
import 'package:pumpfy_app/modules/exercise_details/exercise_details__screen_state.dart';
import 'package:pumpfy_app/modules/exercise_details/factories/exercise_details__screen_bloc_factory.dart';
import 'package:pumpfy_app/modules/exercise_details/exercise_details__screen_event.dart';
import 'package:pumpfy_app/shared/main/mixins/shared__navigable_widget_mixin.dart';

import 'widgets/exercise_details__app_bar_widget.dart';
import 'widgets/exercise_details__body_widget.dart';

class EXERCISE_DETAILS__Screen extends StatelessWidget with
  SHARED__NavigableWidgetMixin<EXERCISE_DETAILS__ScreenBloc, EXERCISE_DETAILS__ScreenEvent, EXERCISE_DETAILS__ScreenState> {
  final String exerciseId;

  const EXERCISE_DETAILS__Screen({ 
    Key? key,
    required this.exerciseId,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<EXERCISE_DETAILS__ScreenBloc>(
      create: (context) => EXERCISE_DETAILS__makeScreenBloc(
        context: context,
        exerciseId: exerciseId,
      )..add(const EXERCISE_DETAILS__ScreenEvent.screenStarted()),
      child: MultiBlocListener(
        listeners: [
          getNavigateToBlocListener()
        ],
        child: const Scaffold(
          appBar: EXERCISE_DETAILS__AppBarWidget(),
          body: EXERCISE_DETAILS__BodyWidget(),
        ),
      ),
    );
  }
}
