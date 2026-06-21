# CarePorter Launch MVP Foundation

CarePorter launches as four frontends on one shared Supabase backend:

- `apps/client`: CarePorter for clients and family members.
- `apps/business`: CarePorter for Business, meaning vendors/service suppliers.
- `apps/provider`: CarePorter for Providers, meaning care/package provider organizations.
- `apps/admin`: internal CarePorter operations.

## Roles

The launch roles are:

- `client`
- `business_staff`
- `provider_staff`
- `admin`

Client and family member are intentionally one role. Provider means care/package provider. Business/vendor means the supplier delivering cleaning, gardening, transport, physio, hearing services, and similar work.

## Booking Pathways

- `provider_managed`: client chooses the vendor, provider approves, vendor confirms, vendor delivers, invoice/payment follows.
- `self_managed_package`: client books directly while CarePorter keeps package records, progress notes, and invoices together.
- `private_pay`: client pays privately; this replaces the older self-funded language.

## Backend Foundation

The first migration creates:

- marketplace actors: profiles, businesses, providers, staff membership tables
- service and booking lifecycle: services, bookings, approvals, progress notes
- money flow: invoices, subscriptions, payment events
- operations: messages, documents, compliance documents
- storage buckets for compliance uploads, progress note attachments, and client documents

RLS is enabled on every public table. Authorization uses profile/staff tables and private helper functions, not user-editable user metadata.

## Payment Abstraction

Stripe implementation should stay behind server-side APIs:

- Stripe Connect for marketplace commission and vendor payouts.
- Stripe Billing for Provider Growth plan.
- Webhooks update `subscriptions`, `invoices`, and `payment_events`.

Legal review may change the commission rate, so `invoices.commission_bps` is stored per invoice.
