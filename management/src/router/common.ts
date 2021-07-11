import dashboard from '@/router/modules/dashboard'
import demos from '@/router/modules/demos'
import redirect from '@/router/modules/redirect'
import externaLink from '@/router/modules/externa-link'

export default [...dashboard, ...demos, ...externaLink, ...redirect]
