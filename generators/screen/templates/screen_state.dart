<%- importPackages %>

part '<%= screenNameLowerCase %>__screen_state.freezed.dart';

@freezed
class <%= screenNameUpperCase %>__ScreenState 
  with 
    _$<%= screenNameUpperCase %>__ScreenState 
  implements 
    FGS_UTILS__NavigableState, 
    FGS_UTILS__ToastMessageLauncherState {
  const <%= screenNameUpperCase %>__ScreenState._();

  const factory <%= screenNameUpperCase %>__ScreenState.main({
    FGS_UTILS__NavigateToState? navigateTo,
    FGS_UTILS__ToastMessageState? toastMessage,
  }) = <%= screenNameUpperCase %>__ScreenState__Main;
  
  @override
  FGS_UTILS__NavigateToState? getNavigateToState() {
    return navigateTo;
  }

  @override
  FGS_UTILS__ToastMessageState? getToastMessageState() {
    return toastMessage;
  }
}
