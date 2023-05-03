<%- importPackages %>

// --- ROUTES NAMES BEGIN ------------------------------------------------------
// --- ROUTES NAMES END --------------------------------------------------------

// --- PATH PARAM KEYS BEGIN ---------------------------------------------------
// --- PATH PARAM KEYS END -----------------------------------------------------

// --- QUERY PARAM KEYS BEGIN --------------------------------------------------
// --- QUERY PARAM KEYS END ----------------------------------------------------


final _router = FGS_UTILS__Router(
  initialLocation: '/',
  routes: [
    // --- ROUTES BEGIN --------------------------------------------------------
    // --- ROUTES END ----------------------------------------------------------
  ],
);

FGS_UTILS__Router get <%= packageName %>__router => _router;
