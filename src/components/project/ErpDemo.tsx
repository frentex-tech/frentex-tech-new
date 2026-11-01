"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { ErpDemoContent, StockItem } from "@/content/projects";

type PurchaseOrder = { id: number; stockId: number; qty: number; received: boolean };

const defaultQuantity = "5";

type ErpDemoProps = {
  content: ErpDemoContent;
  onStatus?: (message: string) => void;
  /** The stock and its status alone, without the order controls, tools or ids, for the Work Lab's inert window onto the demo. */
  preview?: boolean;
};

// Item, available, reorder point and status; the purchase quantity and action columns are controls.
const previewColumns = 4;

/** "Raseed" ERP demo: raise purchase orders and receive them into stock. */
export function ErpDemo({ content, onStatus = () => {}, preview = false }: ErpDemoProps) {
  const defaultQuantities = (): Record<number, string> =>
    Object.fromEntries(content.stock.map((item) => [item.id, defaultQuantity]));
  const [stock, setStock] = useState(content.stock);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  // Like the original, every completed action resets the quantity fields to their default.
  const [quantities, setQuantities] = useState(defaultQuantities);
  const resetRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);

  const hasOpenOrder = (stockId: number) => orders.some((order) => order.stockId === stockId && !order.received);

  function buy(item: StockItem) {
    const input = tableRef.current?.querySelector<HTMLInputElement>(`#qty-${item.id}`);
    const qty = Number(quantities[item.id]);
    if (!Number.isInteger(qty) || qty < 1 || qty > 1000) {
      onStatus(content.status.invalidQuantity);
      input?.focus();
      input?.reportValidity();
      return;
    }
    if (hasOpenOrder(item.id)) return;
    const id = orders.length + 1;
    flushSync(() => {
      setOrders([...orders, { id, stockId: item.id, qty, received: false }]);
      setQuantities(defaultQuantities());
    });
    onStatus(content.status.ordered);
    ordersRef.current?.querySelector<HTMLButtonElement>(`[data-receive="${id}"]`)?.focus();
  }

  function receive(order: PurchaseOrder) {
    if (order.received) return;
    const item = stock.find((stockItem) => stockItem.id === order.stockId)!;
    const qty = item.qty + order.qty;
    flushSync(() => {
      setOrders(orders.map((current) => (current.id === order.id ? { ...current, received: true } : current)));
      setStock(stock.map((stockItem) => (stockItem.id === item.id ? { ...stockItem, qty } : stockItem)));
      setQuantities(defaultQuantities());
    });
    onStatus(content.status.received(order.qty, item.name, qty));
    tableRef.current?.querySelector<HTMLButtonElement>(`[data-buy="${item.id}"]`)?.focus();
  }

  function reset() {
    flushSync(() => {
      setStock(content.stock);
      setOrders([]);
      setQuantities(defaultQuantities());
    });
    onStatus(content.status.reset);
    resetRef.current?.focus();
  }

  return (
    <>
      {!preview && (
        <div className="demo-tools">
          <span className="copy-prompt">{content.prompt}</span>
          <button ref={resetRef} className="small-button" id="reset-erp" onClick={reset}>
            {content.reset}
          </button>
        </div>
      )}
      <div className="table-wrap" ref={tableRef}>
        <table className="demo-table">
          <thead>
            <tr>
              {(preview ? content.columns.slice(0, previewColumns) : content.columns).map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => {
              const pending = hasOpenOrder(item.id);
              const low = item.qty <= item.limit;
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.limit}</td>
                  <td>
                    <span className={low ? "stock-tag low" : "stock-tag"}>
                      {low ? content.stockState.low : content.stockState.available}
                    </span>
                  </td>
                  {!preview && (
                    <>
                      <td>
                        <input
                          aria-label={content.quantityLabel(item.name)}
                          id={`qty-${item.id}`}
                          type="number"
                          min="1"
                          max="1000"
                          step="1"
                          value={quantities[item.id]}
                          onChange={(event) => setQuantities({ ...quantities, [item.id]: event.target.value })}
                          disabled={pending}
                        />
                      </td>
                      <td>
                        <button className="small-button filled" data-buy={item.id} disabled={pending} onClick={() => buy(item)}>
                          {pending ? content.pending : content.buy}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!preview && (
        <div className="purchase-list" ref={ordersRef}>
          <h3>{content.ordersTitle}</h3>
          {orders.length ? (
            orders.map((order) => (
              <div key={order.id} className="purchase-item">
                <span>
                  {content.orderSummary(
                    String(order.id).padStart(3, "0"),
                    stock.find((item) => item.id === order.stockId)!.name,
                    order.qty,
                  )}
                </span>
                {order.received ? (
                  <span className="stock-tag">{content.received}</span>
                ) : (
                  <button className="small-button" data-receive={order.id} onClick={() => receive(order)}>
                    {content.receive}
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="empty-state">{content.empty}</p>
          )}
        </div>
      )}
    </>
  );
}
