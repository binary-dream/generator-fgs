<%- importPackages %>

part '<%= screenNameLowerCase %>__<%= componentNameLowerCase %>_component_state.freezed.dart';

@freezed
class <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState 
  with 
    _$<%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState {
  const <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState._();

  const factory <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState.main({
    String? text,
  }) = <%= screenNameUpperCase %>__<%= componentNameCamelCaseWithoutUnderlineFirstUpper %>ComponentState__Main;
}
