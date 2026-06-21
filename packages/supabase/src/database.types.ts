export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "client" | "business_staff" | "provider_staff" | "admin";
export type BookingPathway = "provider_managed" | "self_managed_package" | "private_pay";
export type BookingStatus =
  | "draft"
  | "pending_provider_approval"
  | "provider_approved"
  | "vendor_confirmed"
  | "in_progress"
  | "completed"
  | "invoice_sent"
  | "paid"
  | "cancelled";
export type ApprovalStatus = "requested" | "question_asked" | "approved" | "declined" | "expired";
export type InvoiceStatus = "draft" | "sent" | "overdue" | "paid" | "void";
export type VerificationStatus =
  | "not_started"
  | "submitted"
  | "automated_review"
  | "human_review"
  | "approved"
  | "renewal_due"
  | "suspended";
export type ProviderPlan = "free" | "growth";

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<{
        id: string;
        role: AppRole;
        full_name: string;
        email: string;
        phone: string | null;
        created_at: string;
        updated_at: string;
      }>;
      businesses: Table<{
        id: string;
        name: string;
        category: string;
        abn: string | null;
        service_area: string | null;
        verification_status: VerificationStatus;
        stripe_connect_account_id: string | null;
        created_at: string;
        updated_at: string;
      }>;
      business_staff_members: Table<{
        business_id: string;
        profile_id: string;
        staff_role: string;
        created_at: string;
      }>;
      providers: Table<{
        id: string;
        name: string;
        provider_type: string;
        plan: ProviderPlan;
        billing_email: string | null;
        stripe_customer_id: string | null;
        created_at: string;
        updated_at: string;
      }>;
      provider_staff_members: Table<{
        provider_id: string;
        profile_id: string;
        staff_role: string;
        created_at: string;
      }>;
      services: Table<{
        id: string;
        business_id: string;
        category: string;
        name: string;
        description: string | null;
        rate_cents: number;
        duration_minutes: number | null;
        is_published: boolean;
        created_at: string;
        updated_at: string;
      }>;
      client_provider_links: Table<{
        client_profile_id: string;
        provider_id: string;
        status: string;
        client_reference: string | null;
        approval_email: string | null;
        finance_email: string | null;
        created_at: string;
      }>;
      bookings: Table<{
        id: string;
        client_profile_id: string;
        requested_by: string;
        business_id: string;
        service_id: string;
        provider_id: string | null;
        pathway: BookingPathway;
        status: BookingStatus;
        scheduled_start: string | null;
        scheduled_end: string | null;
        care_preferences: Json;
        access_notes: string | null;
        approval_email: string | null;
        finance_email: string | null;
        estimated_amount_cents: number | null;
        created_at: string;
        updated_at: string;
      }>;
      approvals: Table<{
        id: string;
        booking_id: string;
        provider_id: string;
        status: ApprovalStatus;
        question: string | null;
        decision_note: string | null;
        requested_at: string;
        decided_at: string | null;
        decided_by: string | null;
      }>;
      progress_notes: Table<{
        id: string;
        booking_id: string;
        author_profile_id: string;
        business_id: string;
        note: string;
        attachments: Json;
        created_at: string;
      }>;
      invoices: Table<{
        id: string;
        booking_id: string;
        business_id: string;
        provider_id: string | null;
        amount_cents: number;
        commission_bps: number;
        status: InvoiceStatus;
        sent_to_email: string | null;
        due_date: string | null;
        expected_payment_date: string | null;
        stripe_invoice_id: string | null;
        created_at: string;
        updated_at: string;
      }>;
      messages: Table<{
        id: string;
        booking_id: string | null;
        sender_profile_id: string;
        recipient_profile_id: string;
        body: string;
        read_at: string | null;
        created_at: string;
      }>;
      documents: Table<{
        id: string;
        owner_profile_id: string;
        booking_id: string | null;
        title: string;
        document_type: string;
        storage_bucket: string;
        storage_path: string;
        created_at: string;
      }>;
      compliance_documents: Table<{
        id: string;
        business_id: string;
        document_type: string;
        status: VerificationStatus;
        expires_on: string | null;
        storage_bucket: string;
        storage_path: string;
        reviewed_by: string | null;
        reviewed_at: string | null;
        created_at: string;
      }>;
      subscriptions: Table<{
        id: string;
        provider_id: string;
        plan: ProviderPlan;
        status: string;
        stripe_customer_id: string | null;
        stripe_subscription_id: string | null;
        current_period_end: string | null;
        created_at: string;
        updated_at: string;
      }>;
      payment_events: Table<{
        id: string;
        invoice_id: string | null;
        provider_id: string | null;
        business_id: string | null;
        stripe_event_id: string | null;
        status: string;
        amount_cents: number | null;
        commission_cents: number | null;
        created_at: string;
      }>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
      booking_pathway: BookingPathway;
      booking_status: BookingStatus;
      approval_status: ApprovalStatus;
      invoice_status: InvoiceStatus;
      verification_status: VerificationStatus;
      provider_plan: ProviderPlan;
    };
    CompositeTypes: Record<string, never>;
  };
};
