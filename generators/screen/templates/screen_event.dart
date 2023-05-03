<%- importPackages %>

part '<%= screenNameLowerCase %>__screen_event.freezed.dart';

@freezed
class <%= screenNameUpperCase %>__ScreenEvent with _$<%= screenNameUpperCase %>__ScreenEvent {
  const factory <%= screenNameUpperCase %>__ScreenEvent.screenStarted() = 
    <%= screenNameUpperCase %>__ScreenEvent__ScreenStarted;
}
