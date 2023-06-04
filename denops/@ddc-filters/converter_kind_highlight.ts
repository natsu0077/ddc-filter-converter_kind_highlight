import {
  BaseFilter,
  Item,
} from "https://deno.land/x/ddc_vim@v3.5.0/types.ts";

type Params = {
  kindHighlights: Record<string, string>;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params,
    completeStr: string,
    items: Item[],
  }): Promise<Item[]> {
    for (const item of args.items) {
      if (item.kind) {
        if (!item.highlights) {
          item.highlights = [];
        }
        item.highlights.push({
          name: "ddc-filter-converter_kind_highlight",
          type: "kind",
          hl_group: args.filterParams.kindHighlights[item.kind] ?? "",
          col: 0,
          width: item.kind.length,
        });
      }
    }
    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
      kindHighlights: {}
    };
  }
}
