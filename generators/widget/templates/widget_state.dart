<%- importPackages %>

part '<%= screenNameLowerCase %>__<%= widgetNameLowerCase %>_widget_state.freezed.dart';

@freezed
class <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState 
  with 
    _$<%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState {
  const <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState._();

  const factory <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState.main({
    required String text,
  }) = <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState__Main;
}
