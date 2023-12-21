import { State } from ".";

export default function registerReducer(
  state: State,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case ("SET_FILTERS"):
      return ({ ...state, filters: action.payload })

    case ("SET_ACTIVE_FILTERS"):
      return ({ ...state, activeFilters: action.payload })

    case ("RESET_ACTIVE_FILTERS"):
      return ({ ...state, activeFilters: [] })

    case ("SET_COUNTRIES"):
      return ({ ...state, countries: action.payload })

    case ("SET_BREADCRUMB"):
      return ({ ...state, breadcrumb: [...state.breadcrumb, action.payload] })

    case ("SET_BREADCRUMB_PO1"):
      {
        return ({ ...state, breadcrumb: [action.payload] })
      }

    case ("SET_BREADCRUMB_PO2"):
      {
        const newBreadcrumb = [...state.breadcrumb]
        newBreadcrumb[1] = action.payload
        return ({ ...state, breadcrumb: [newBreadcrumb[0], newBreadcrumb[1]] })
      }

    case ("SET_BREADCRUMB_PO3"):
      {
        const newBreadcrumb = [...state.breadcrumb]
        newBreadcrumb[2] = action.payload
        return ({ ...state, breadcrumb: newBreadcrumb })
      }

    case ("SET_TAG"):
      if (action.payload.index > 0) {
        const newTag = [...state.tag]
        newTag[action.payload.index] = action.payload
        return ({ ...state, tag: newTag })
      } else {
        return ({ ...state, tag: [...state.tag, action.payload] })
      }


    case ("RESET_TAG"):
      return ({ ...state, tag: [] })

    default:
      return state;
  }
}
