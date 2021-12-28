import Globalize from "globalize";
import cldrData from "cldr-data";
Globalize.load(cldrData.entireSupplemental());
Globalize.load(cldrData.entireMainFor("en", "ar"));

Globalize("en").formatDate(new Date());
Globalize("ar").formatDate(new Date());
