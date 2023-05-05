<%- importPackages %>

class <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>Widget 
  extends StatelessWidget {
  const <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>Widget({
    super.key, 
    required this.state,
  });

  final <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithoutUnderlineFirstUpper %>WidgetState state;

  @override
  Widget build(BuildContext context) {
    return Text(state.text);
  }
}
