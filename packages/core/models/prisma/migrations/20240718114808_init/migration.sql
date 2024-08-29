-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MAKER');

-- CreateEnum
CREATE TYPE "SocialNetworkType" AS ENUM ('X', 'INSTAGRAM', 'NAVER');

-- CreateEnum
CREATE TYPE "MakerFileType" AS ENUM ('PORTFOLIO', 'REFERENCE', 'BUSINESS_LICENSE');

-- CreateEnum
CREATE TYPE "MakerRequestStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('PENDING', 'REVIEWING', 'IN_PRODUCTION', 'RELEASED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('BASIC', 'ESSENTIAL', 'PREMIUM');

-- CreateEnum
CREATE TYPE "CalculationType" AS ENUM ('ORDER_CONFIRMATION', 'WITHDRAWAL_COMPLETE', 'DEDUCTION');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MAKER', 'FLEA_MARKET');

-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('SELL', 'PURCHASE', 'EXCHANGE', 'FREE_SHARING');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT_CARD', 'NAVER_PAY', 'KAKAO_PAY', 'TOSS', 'VIRTUAL_ACCOUNT', 'INSTANT_BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "OrderDeliveryStatus" AS ENUM ('PENDING', 'SENT', 'CONFIRMED', 'CANCELED', 'EXCHANGED', 'RETURNED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderCancelReasonType" AS ENUM ('CHANGE_OF_MIND', 'ORDER_MISTAKE', 'CANCEL_AND_REORDER', 'SERVICE_COMPLAINT');

-- CreateEnum
CREATE TYPE "FleaMarketProductStatus" AS ENUM ('FOR_SALE', 'RESERVED', 'SOLD_OUT');

-- CreateEnum
CREATE TYPE "MakerType" AS ENUM ('INDIVIDUAL', 'INDIVIDUAL_BUSINESS', 'CORPORATE_BUSINESS');

-- CreateTable
CREATE TABLE "landing_carousel_image" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "link" TEXT,

    CONSTRAINT "landing_carousel_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "popular_maker" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "maker_id" TEXT NOT NULL,

    CONSTRAINT "popular_maker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommended_product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "recommended_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "faq_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" INTEGER NOT NULL,
    "order_index" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notice" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_index" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "flea_market_product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "seller_user_id" TEXT NOT NULL,
    "buyer_user_id" TEXT,
    "category_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "trade_type" "TradeType" NOT NULL,
    "price" INTEGER,
    "description" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "status" "FleaMarketProductStatus" NOT NULL DEFAULT 'FOR_SALE',

    CONSTRAINT "flea_market_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_product_image" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "flea_market_product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_product_tag" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "flea_market_product_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_product_complaint" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,
    "complained_user_id" TEXT NOT NULL,
    "complaint_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "flea_market_product_complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_chat_room" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,

    CONSTRAINT "flea_market_chat_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "chat_room_id" TEXT NOT NULL,
    "sender_user_id" TEXT NOT NULL,
    "receiver_user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_image" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "message_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "message_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "maker_type" "MakerType" NOT NULL,
    "plan" "PlanType" NOT NULL,
    "profile_url" TEXT,
    "name" TEXT NOT NULL,
    "resident_registration_number" TEXT,
    "business_name" TEXT NOT NULL,
    "business_number" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "MakerRequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "maker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker_social_id" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "maker_id" TEXT NOT NULL,
    "type" "SocialNetworkType" NOT NULL,
    "social_id" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "maker_social_id_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker_file" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "maker_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "type" "MakerFileType" NOT NULL,

    CONSTRAINT "maker_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "maker_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_images" TEXT[],
    "tags" TEXT[],
    "representative_price" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "product_id" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "product_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_edit_request" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "product_id" TEXT NOT NULL,
    "maker_id" TEXT NOT NULL,
    "is_reflected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_edit_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker_bank_account" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "maker_id" TEXT NOT NULL,
    "bank_code" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_holder" TEXT NOT NULL,

    CONSTRAINT "maker_bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker_calculation_record" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "maker_id" TEXT NOT NULL,
    "product_order_id" TEXT,
    "type" "CalculationType" NOT NULL,
    "title" TEXT NOT NULL,
    "title_tooltip" TEXT,
    "amount" INTEGER NOT NULL,
    "amount_tooltip" TEXT,
    "accumulated_amount" INTEGER NOT NULL,

    CONSTRAINT "maker_calculation_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maker_withdrawal_record" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "calculation_record_id" TEXT NOT NULL,
    "expected_deposit_date" DATE,

    CONSTRAINT "maker_withdrawal_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_confirmation_record" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_order_id" TEXT NOT NULL,
    "maker_calculation_record_id" TEXT NOT NULL,

    CONSTRAINT "order_confirmation_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "point_record" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL,
    "point_amount" INTEGER NOT NULL,

    CONSTRAINT "point_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "notification_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "phone_number" TEXT,
    "is_email_subscribed" BOOLEAN NOT NULL DEFAULT false,
    "is_message_subscribed" BOOLEAN NOT NULL DEFAULT false,
    "birth_date" DATE,
    "total_point" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "refresh_token_expires_in" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_like" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_product_like" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,

    CONSTRAINT "flea_market_product_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_cart_item" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_option_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "shopping_cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_information" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_label" TEXT NOT NULL,
    "addressee" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "detail_address" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "delivery_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_order" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_label" TEXT NOT NULL,
    "addressee" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "detail_address" TEXT NOT NULL,
    "order_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "delivery_fee" INTEGER NOT NULL DEFAULT 3000,
    "total_price" INTEGER NOT NULL,
    "used_point" INTEGER NOT NULL DEFAULT 0,
    "total_payment_amount" INTEGER NOT NULL,
    "delivery_note" TEXT,
    "payment_type" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "receipt_url" TEXT NOT NULL,

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_order_item" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_option_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "tracking_number" TEXT NOT NULL DEFAULT '',
    "order_status" "OrderDeliveryStatus" NOT NULL,

    CONSTRAINT "product_order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_review" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "review_images" TEXT[],

    CONSTRAINT "product_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_cancel_request" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "cancel_reason_type" "OrderCancelReasonType" NOT NULL,
    "reason" TEXT,

    CONSTRAINT "order_cancel_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flea_market_product_review" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "flea_market_product_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "review_images" TEXT[],

    CONSTRAINT "flea_market_product_review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "popular_maker_maker_id_key" ON "popular_maker"("maker_id");

-- CreateIndex
CREATE UNIQUE INDEX "recommended_product_product_id_key" ON "recommended_product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_slug_key" ON "product_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "faq_category_slug_key" ON "faq_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "maker_user_id_key" ON "maker"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "maker_slug_key" ON "maker"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "maker_bank_account_maker_id_key" ON "maker_bank_account"("maker_id");

-- CreateIndex
CREATE UNIQUE INDEX "maker_calculation_record_product_order_id_key" ON "maker_calculation_record"("product_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "maker_withdrawal_record_calculation_record_id_key" ON "maker_withdrawal_record"("calculation_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_confirmation_record_product_id_key" ON "order_confirmation_record"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_confirmation_record_product_order_id_key" ON "order_confirmation_record"("product_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_confirmation_record_maker_calculation_record_id_key" ON "order_confirmation_record"("maker_calculation_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");

-- CreateIndex
CREATE INDEX "product_like_product_id_idx" ON "product_like"("product_id");

-- CreateIndex
CREATE INDEX "product_like_user_id_idx" ON "product_like"("user_id");

-- CreateIndex
CREATE INDEX "shopping_cart_item_user_id_idx" ON "shopping_cart_item"("user_id");

-- CreateIndex
CREATE INDEX "shopping_cart_item_product_option_id_idx" ON "shopping_cart_item"("product_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "shopping_cart_item_user_id_product_option_id_key" ON "shopping_cart_item"("user_id", "product_option_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_order_order_number_key" ON "product_order"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "product_review_order_item_id_key" ON "product_review"("order_item_id");

-- CreateIndex
CREATE INDEX "product_review_product_id_idx" ON "product_review"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_cancel_request_order_item_id_key" ON "order_cancel_request"("order_item_id");

-- AddForeignKey
ALTER TABLE "popular_maker" ADD CONSTRAINT "popular_maker_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommended_product" ADD CONSTRAINT "recommended_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "faq_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product" ADD CONSTRAINT "flea_market_product_seller_user_id_fkey" FOREIGN KEY ("seller_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product" ADD CONSTRAINT "flea_market_product_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product" ADD CONSTRAINT "flea_market_product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_image" ADD CONSTRAINT "flea_market_product_image_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_tag" ADD CONSTRAINT "flea_market_product_tag_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_complaint" ADD CONSTRAINT "flea_market_product_complaint_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_complaint" ADD CONSTRAINT "flea_market_product_complaint_complained_user_id_fkey" FOREIGN KEY ("complained_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_chat_room" ADD CONSTRAINT "flea_market_chat_room_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "flea_market_chat_room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_user_id_fkey" FOREIGN KEY ("receiver_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_image" ADD CONSTRAINT "message_image_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker" ADD CONSTRAINT "maker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_social_id" ADD CONSTRAINT "maker_social_id_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_file" ADD CONSTRAINT "maker_file_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_edit_request" ADD CONSTRAINT "product_edit_request_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_edit_request" ADD CONSTRAINT "product_edit_request_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_bank_account" ADD CONSTRAINT "maker_bank_account_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_calculation_record" ADD CONSTRAINT "maker_calculation_record_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "maker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_calculation_record" ADD CONSTRAINT "maker_calculation_record_product_order_id_fkey" FOREIGN KEY ("product_order_id") REFERENCES "product_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maker_withdrawal_record" ADD CONSTRAINT "maker_withdrawal_record_calculation_record_id_fkey" FOREIGN KEY ("calculation_record_id") REFERENCES "maker_calculation_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_confirmation_record" ADD CONSTRAINT "order_confirmation_record_maker_calculation_record_id_fkey" FOREIGN KEY ("maker_calculation_record_id") REFERENCES "maker_calculation_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_confirmation_record" ADD CONSTRAINT "order_confirmation_record_product_order_id_fkey" FOREIGN KEY ("product_order_id") REFERENCES "product_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_confirmation_record" ADD CONSTRAINT "order_confirmation_record_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_record" ADD CONSTRAINT "point_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_record" ADD CONSTRAINT "point_record_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "product_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_like" ADD CONSTRAINT "product_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_like" ADD CONSTRAINT "product_like_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_like" ADD CONSTRAINT "flea_market_product_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_like" ADD CONSTRAINT "flea_market_product_like_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_product_option_id_fkey" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_information" ADD CONSTRAINT "delivery_information_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order_item" ADD CONSTRAINT "product_order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "product_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order_item" ADD CONSTRAINT "product_order_item_product_option_id_fkey" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_review" ADD CONSTRAINT "product_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_review" ADD CONSTRAINT "product_review_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "product_order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_review" ADD CONSTRAINT "product_review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel_request" ADD CONSTRAINT "order_cancel_request_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "product_order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_review" ADD CONSTRAINT "flea_market_product_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flea_market_product_review" ADD CONSTRAINT "flea_market_product_review_flea_market_product_id_fkey" FOREIGN KEY ("flea_market_product_id") REFERENCES "flea_market_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
