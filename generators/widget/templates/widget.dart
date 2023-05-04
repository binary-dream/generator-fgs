<%- importPackages %>

class <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>Widget 
  extends StatelessWidget {
  const <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>Widget({
    super.key, 
    required this.state,
  });

  final <%= screenNameUpperCase %>__<%= widgetNameCamelCaseWithouUnderlineFirstUpper %>WidgetState state;

  @override
  Widget build(BuildContext context) {
    return Text(state.text);
  }
}
