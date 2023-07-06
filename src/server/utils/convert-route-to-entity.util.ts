const mapping: Record<string, string> = {
  organizations: 'organization',
  technologies: 'technology',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
