<%- importPackages %>

part '<%= screenNameLowerCase %>__<%= widgetNameLowerCase %>_widget_state.freezed.dart';

@freezed
class <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState 
  with 
    _$<%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState {
  const <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState._();

  const factory <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState.main({
    required String text,
  }) = <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState__Main;
}
