import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: () => import("../views/Home.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    name: 'Landing Page',
    component: () => import("../views/LandingPage.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/patient/:id',
    name: 'Patient Detail',
    component: () => import("../views/PatientDetail.vue"),
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import("../views/Appointments.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/appointments/edit/:id",
    name: 'Edit Appointments',
    component: () => import("../views/Appointments.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/appointments/new",
    name: "New Appointment",
    component:() => import("../views/AddAppointment.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/patients/new",
    name: "New Patient",
    component:() => import("../views/AddPatient.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/appointments/new/patient/:id",
    name: "New Patient Appointment",
    component:() => import("../views/PatientAppointment.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/finances",
    name: "Finances",
    component:() => import("../views/Billing.vue"),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/messages",
    name: "Messages",
    component: () => import("../views/Billing.vue"), // todo
    meta: {
      requireAuth: true
    } 
  },  
  {
    path: "/manage-clinic",
    name: "Manage Clinic",
    component: () => import("../views/Billing.vue"), // todo
    meta: {
      requireAuth: true
    } 
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/Billing.vue"), // todo
    meta: {
      requireAuth: true
    } 
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn;

  if (to.matched.some(record => record.meta.requireAuth)) {
    if(isLoggedIn)
      next();
    else {
      if(to.matched.some(record => record.path === ""))
        next({ name : 'Landing Page' })
      else 
        next({ name: 'Login' })
    }
  } else
    next();

  if(isLoggedIn && to.matched.some(record => record.name === 'Login')) {
    next({ name: 'Overview' })
  }
});

export default router
