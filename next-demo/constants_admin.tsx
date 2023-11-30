import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
{
    title: 'Dashboard',
    path: '/page_admin/dashboard',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'User',
    path: '/page_admin/users',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  
  {
    title: 'Tareas',
    path: '/page_admin/tareas',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Miembros',
    path: '/page_admin/miembros',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Proceso',
    path: '/page_admin/resumen_proceso',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Informes',
    path: '/page_admin/informes',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Tiempo',
    path: '/page_admin/registro_tiempo',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Inicio_proyecto',
    path: '/page_admin/lanzamiento',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Fin_proyecto',
    path: '/page_admin/liberacion_proyecto',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Calendario',
    path: '/page_admin/calendario',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Tablero',
    path: '/page_admin/tablero_board',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  
];