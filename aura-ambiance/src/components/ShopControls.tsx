import type { SortOption } from '../types'

type Props = {
  query: string
  onQueryChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
  categories: string[]
}

export default function ShopControls({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  categories
}: Props) {
  const fieldClass =
    'rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-aura-500 focus:ring-2 focus:ring-rose-100'

  return (
    <div className="grid gap-3 rounded-2xl border border-rose-100 bg-rose-50/50 p-4 md:grid-cols-3">
      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Search
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products or scents"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Category
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={fieldClass}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        Sort
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className={fieldClass}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </label>
    </div>
  )
}
