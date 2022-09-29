import {handler} from '../../services/TalentHubTable/Create'

const result = handler({} as any,{} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body)
})