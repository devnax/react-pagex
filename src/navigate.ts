const navigate = {
   go: (path: string) => {
      window.history.pushState({ pagex: true, path }, "", path)
      dispatchEvent(new PopStateEvent("popstate", { state: { pagex: true, path } }))
   },
   reload: () => {
      dispatchEvent(new PopStateEvent("popstate", {
         state: {
            path: window.location.pathname,
            pagex: true
         }
      }))
   },
   back: () => window.history.back(),
   forward: () => window.history.forward()
}

export default navigate