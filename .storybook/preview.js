import {setCompodocJson} from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

setCompodocJson(docJson);


export const parameters = {
  layout: 'centered',
  previewTabs: {
    canvas: { hidden: true },
  },
  viewMode: 'docs'
}
