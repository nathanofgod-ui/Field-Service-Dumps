(() => {

  const DATA = [
    {
      topic:"Asset Lifecycle",
      select:1,
      prompt:"Universal Containers (UC) wants to track the Asset lifecycle when Equipment has been swapped out. What should a consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Add the Related Asset related list to the Asset Page and configure the Asset Relationship object."},
        {k:"B", t:"Add the field history tracking related list to the Asset Page and configure the Product Request object."},
        {k:"C", t:"Add the Related Asset related list to the Asset Page and configure the Product Request object."},
        {k:"D", t:"Add the field history tracking related list to the Asset Page and configure the Asset Relationship object."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Asset Relationship (\`AssetRelationship\`) is Salesforce's purpose-built object for connecting two separate Asset records — exactly what a swap-out is. It carries a Relationship Type (Salesforce ships "Upgrade"; orgs commonly extend it with "Swap") plus start/end dates, and the link shows up bidirectionally: the old asset's "Primary Assets" list shows what replaced it, the new asset's "Related Assets" list shows what it replaced. The Related Asset related list is simply the page-layout element that surfaces those AssetRelationship records.

**Why B and D are wrong.** Field history tracking only logs changes to field *values on one record* — it has no concept of a link between two different Asset records, so it can't represent "this asset replaced that one." Product Request is a Field Service object for requisitioning parts on a work order; it has nothing to do with asset-to-asset lineage.

**Why C is wrong.** The related list is right, but it's paired with the wrong backing object — Related Asset surfaces AssetRelationship records, not Product Request records.`,
      sources:[
        {l:"Track Customer Assets — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets"},
        {l:"Asset Fields — Salesforce Help", u:"https://help.salesforce.com/apex/HTViewHelpDoc?id=assets_fields.htm"}
      ]
    },
    {
      topic:"Scheduling & Dispatch",
      select:1,
      prompt:"The dispatcher at Ursa Major Solar needs to adjust scheduled service appointments so high-priority work can be scheduled in favor of previously scheduled lower-priority work. Which action should the dispatcher take to change the schedule?",
      options:[
        {k:"A", t:"Use the Flag action on the new appointment."},
        {k:"B", t:"Use the Reschedule action on the existing appointment."},
        {k:"C", t:"Use the Reshuffle action on the new appointment."},
        {k:"D", t:"Use the Group Nearby action on the new appointment."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Reshuffle is built for exactly this: fitting a new, more important appointment into an already-full schedule. Applied to the new appointment, Salesforce can move other bookings to different slots, shifts, or resources, and explicitly reschedules lower-priority appointments to make room for higher-priority ones — even creating a temporary overlap if the appointment's "Schedule over lower priority appointment" setting allows it.

**Why A is wrong.** Flag just marks an appointment for attention — a visual note, not a scheduling action. It doesn't move or reprioritize anything.

**Why B is wrong.** Reschedule reopens one specific appointment for rebooking. The dispatcher would have to apply it manually, one at a time, to every conflicting lower-priority appointment — it doesn't evaluate priority and cascade changes the way Reshuffle does.

**Why D is wrong.** Group Nearby is a geographic/route optimization — clustering appointments near the same location or resource. It has nothing to do with priority-based displacement.`,
      sources:[
        {l:"Reshuffle Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_reshuffling.htm&type=5"},
        {l:"Optimizing Daily Schedules — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/handle-inday-changes"}
      ]
    },
    {
      topic:"Crew Management",
      select:1,
      prompt:"Universal Containers plans to implement Crew Management to better support its clients. Which area does the Consultant need to consider as part of the recommendation?",
      options:[
        {k:"A", t:"The Preferred Resource service objective is ignored for active Crew Members."},
        {k:"B", t:"Capacity-based scheduling is supported for Service Crews."},
        {k:"C", t:"Salesforce Field Service considers the Recommended Crew Size when assigning appointments."},
        {k:"D", t:"A service resource can only be a member of a single Crew."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** This is stated directly in Salesforce's "Considerations for Scheduling Service Crews": the Required Resource and Excluded Resource work rules, and the Preferred Resource service objective, don't apply to active service crew members. If UC's dispatching relies on "preferred technician" logic today, that logic silently stops working once a resource becomes an active crew member — worth flagging to the client up front.

**Why B is wrong.** The documentation says the opposite: capacity-based scheduling isn't supported for service crews, because a resource of type Crew can't be capacity-based.

**Why C is wrong.** Field Service explicitly does *not* consider the Recommended Crew Size when assigning appointments — only the Minimum Crew Size affects scheduling; Recommended Crew Size is informational only.

**Why D is wrong.** A resource can belong to multiple crews at once, as long as the membership date ranges don't overlap.`,
      sources:[
        {l:"Considerations for Scheduling Service Crews — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_service_crews_considerations.htm&language=en_US&type=5"},
        {l:"Create Service Crews for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_crews.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:1,
      prompt:"Universal Containers has Resources working in multiple countries and time zones. Each country has different holidays and working hours as allowed by law. What should a Consultant recommend to implement these parameters with the most flexibility possible?",
      options:[
        {k:"A", t:"Work Types, Resource Availabilities, and Operating Hours"},
        {k:"B", t:"Skills, Operating Hours, Time Slots, and Holidays."},
        {k:"C", t:"Service Territories, Resource Capacity, and Business Hours"},
        {k:"D", t:"Service Territories, Operating Hours and Resource Absences"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Time zone, legal working hours, and holidays are all handled through Operating Hours and its children. Operating Hours carries the time zone, so you create one record per country/region. Time Slots are the child records that define recurring windows per weekday — exactly the mechanism for capturing legally-mandated hour patterns that differ by country. Holidays is Salesforce's dedicated object for non-working dates, and it links to Operating Hours so a country's public-holiday calendar automatically blocks scheduling wherever that Operating Hours record is used. Skills rounds this out for a global workforce, since certifications and licenses commonly differ by jurisdiction.

**Why A is wrong.** Work Types define the nature/duration of a job, and Resource Availabilities only add one-off extra windows for an individual — neither scales to represent a whole country's legal hours or holiday calendar.

**Why C is wrong.** Business Hours is the legacy Case/Entitlement object and lacks the Time Slot structure Field Service scheduling relies on; Resource Capacity caps appointment volume and has nothing to do with holidays or time zones.

**Why D is wrong.** Resource Absences is documented as capturing *individual* time off (vacation, training, medical) — using it for country-wide holidays means manually logging every holiday for every resource, every year, and it doesn't address the "different working hours" half of the requirement at all (no Time Slots).`,
      sources:[
        {l:"Configure Territories and Set Operating Hours — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_basics/field_service_basics_set"},
        {l:"Create Service Resource Absences — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_absences.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Mobile Knowledge",
      select:1,
      prompt:"Service technicians at AW Computing use the Field Service mobile application when in the field. The technicians rely on Knowledge articles to assist them with completing assigned work. How should the solution be configured to ensure technicians can access relevant Knowledge articles?",
      options:[
        {k:"A", t:"Update the Service Appointment page layout to include the Articles related list."},
        {k:"B", t:"Create a quick action on the work order to search the Knowledge base."},
        {k:"C", t:"Add the Knowledge Lightning Component to the Field Service mobile app."},
        {k:"D", t:"Attach the relevant articles to the work order or work order line items."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own documentation states the Knowledge card on the work order overview screen in the mobile app "shows articles attached to the work order or work order line item." Once Knowledge is enabled and the Articles related list sits on the Work Order/Line Item layout, what determines relevance is which specific articles are attached to that job record — technicians reach them by tapping Related in the work order carousel.

**Why A is wrong.** Wrong object — the documented setup ties the Articles related list to Work Order and Work Order Line Item layouts, not Service Appointment.

**Why B is wrong.** No custom search action is part of the documented feature; the mobile app surfaces attached articles natively without one.

**Why C is wrong.** There's no "Knowledge Lightning Component" step for the Field Service mobile app in Salesforce's documentation — that's a Console/agent-facing pattern, not how the mobile app exposes articles.`,
      sources:[
        {l:"View Knowledge Articles in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_knowledge.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:3,
      prompt:"Universal Containers wants to track Technicians' van stock using the Salesforce Field Service mobile app and ensure that Technicians report when parts are used. Which three data elements should a Consultant recommend tracking to support these requirements?",
      options:[
        {k:"A", t:"Products Consumed"},
        {k:"B", t:"Inventory"},
        {k:"C", t:"Warehouse Locations"},
        {k:"D", t:"Mobile Locations"},
        {k:"E", t:"Products Required"}
      ],
      correct:["A","B","D"],
      explanation:
`**Why A, B, and D are right.** A technician's van is modeled by enabling the Mobile Location field on a Location record — that's what makes it show up as a personal stock point in the mobile app's inventory tab. Inventory itself lives on Product Item records, which pair a Product with a Location and hold the quantity on hand — once the van is a Mobile Location, its Product Items are the running van-stock counts. Products Consumed is the documented mechanism for logging usage from the mobile app: when a technician marks parts consumed on a job, the corresponding Product Item decrements — directly satisfying "report when parts are used."

**Why C is wrong.** Warehouses are where van stock gets replenished from, but the requirement is specifically about *van* stock, which is the Mobile Location flag's job, not the warehouse's.

**Why E is wrong.** Products Required tracks parts a technician anticipates needing *before* a job — planning, not usage. It doesn't decrement stock and isn't how consumption gets reported.`,
      sources:[
        {l:"Set Up Multiple Inventory Locations — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_products_multiple_locations.htm&language=en_US&type=5"},
        {l:"FSL Inventory Management — Cirrius Solutions", u:"https://cirriussolutions.com/salesforce-field-service-fsl-inventory-management/"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"An inventory manager at Universal Containers wants to better understand the distribution of a critical and expensive part across all inventory locations as the part is reused and restocked. What should the Consultant leverage to meet this requirement?",
      options:[
        {k:"A", t:"Assets"},
        {k:"B", t:"Maintenance Plan"},
        {k:"C", t:"Product Item"},
        {k:"D", t:"Entitlement Plan"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** "Product items track the quantity of a particular product at a location," per Salesforce Help — that's the exact pairing needed. A Product Item record exists per Product per Location, so filtering or reporting on all Product Item records for that part shows exactly how many units sit at each warehouse, van, or other stocking point, and it updates naturally as the part is consumed, transferred, or restocked.

**Why A is wrong.** Assets represent a specific unit sold or installed at a customer — a customer-facing installed base, not warehouse/van stock levels.

**Why B is wrong.** Maintenance Plans generate recurring preventive-maintenance work orders on a schedule; they say nothing about how many spare units exist across locations.

**Why D is wrong.** Entitlement Plans define support/warranty terms — a service-contract construct entirely unrelated to physical inventory counts.`,
      sources:[
        {l:"Product Item and Inventory Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_parts_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Resources & Licensing",
      select:1,
      prompt:"An employee at Universal Containers performs the role of a Dispatcher and a Technician. How should a Consultant configure Salesforce Field Service to support this behavior?",
      options:[
        {k:"A", t:"Create one Service Resource and assign the Technician and Dispatcher role."},
        {k:"B", t:"Create two Skills records and assign them to the Service Resource record."},
        {k:"C", t:"Create one Service Resource and assign the relevant Permission Set Licenses."},
        {k:"D", t:"Create two Service Resources and assign them to the employee."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** A Service Resource ties to a single User, and splitting one employee across multiple Service Resource records creates conflicting scheduling/skills/absence data. Role access (dispatch vs. field work) is governed by Permission Set Licenses instead — "Field Service Scheduling" and "Field Service Dispatcher" can both be assigned to the same user (or bundled via "Field Service Plus," which exists specifically for people who "wear two hats regularly"). One Service Resource, two Permission Set Licenses on the same user, covers both roles.

**Why A is wrong.** A Service Resource's ResourceType is a single-select picklist (Technician, Dispatcher, or Crew) — it can't hold two values at once. Dual capability comes from licensing, not this field.

**Why B is wrong.** Skills represent job competencies used to match a resource to work requirements — they have no bearing on which screens or capabilities (Dispatcher Console vs. mobile app) a user can access.

**Why D is wrong.** One employee should map to one Service Resource; two would create duplicate Gantt entries and ambiguous appointment assignment.`,
      sources:[
        {l:"Field Service License Types: Dispatcher vs Technician", u:"https://salesforcenegotiations.com/field-service-license-types-dispatcher-vs-technician-and-more/"},
        {l:"Create Service Resources for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_resources.htm&language=en_US&type=5"},
        {l:"Field Service Permission Set Licenses", u:"https://blog.bhanuprakashsfdc.com/field-service-permission-set-licenses/"}
      ]
    },
    {
      topic:"Licensing",
      select:1,
      prompt:"Universal Containers plans to deploy Salesforce Field Service to 100 external contractors. There are 75 contractors who need access to Work Orders, Assets, Mobile App, and Chatter. The remaining 25 contractors are paid a commission on sales of containers and need to schedule resources. Which license types and quantities should the Consultant recommend?",
      options:[
        {k:"A", t:"75 Contractor, 25 Contractor Plus"},
        {k:"B", t:"100 Contractor, 100 Contractor Plus"},
        {k:"C", t:"25 Contractor, 75 Contractor Plus"},
        {k:"D", t:"25 Contractor, 100 Contractor Plus"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Contractor covers the baseline needs: mobile app access, viewing/managing assigned Work Orders, submitting updates — matching the 75 who only need Work Orders, Assets, Mobile App, and Chatter. Contractor Plus adds Scheduling & Optimization / Dispatcher Console access plus Lead Management and Opportunity Tracking for cross-sell/upsell — a precise match for the 25 who earn commission on sales (the revenue piece) and need to schedule resources (the scheduling piece). Matching headcount to the feature boundary keeps 75 users on the cheaper tier and puts only the 25 who need it on the premium one.

**Why B, C, and D are wrong.** B double-licenses everyone with both tiers unnecessarily. C reverses the split, leaving the commissioned group without the scheduling/opportunity features they need while over-licensing the basic 75. D licenses all 100 with Contractor Plus on top of 25 Contractor licenses — 125 total licenses for 100 people, paying premium pricing for 75 users who don't need it.`,
      sources:[
        {l:"Salesforce Field Service Pricing — Contractor vs. Contractor Plus", u:"https://www.salesforce.com/service/field-service-management/pricing/"},
        {l:"Field Service Lightning Pricing and License Types — rockITdata", u:"https://rockitdata.com/02/salesforce-field-service-lightning-pricing-and-license-types/"}
      ]
    },
    {
      topic:"Work Orders & Appointments",
      select:2,
      prompt:"A Universal Containers customer is having issues with three containers at the customer's site. Each container is tracked as an Asset on the customer's Account. Which two methods should the Consultant recommend to ensure the service associated with each container can be handled independently?",
      options:[
        {k:"A", t:"Add each Asset to a separate Work Order Line Item. Create a Service Appointment for the Work Order."},
        {k:"B", t:"Add each Asset to a separate Work Order. Create a Service Appointment for each Work Order."},
        {k:"C", t:"Add each Asset to a separate Work Order Line Item. Create a Service Appointment for each Line Item."},
        {k:"D", t:"Add each Asset to a separate child Work Order. Create a Service Appointment for the parent Work Order."}
      ],
      correct:["B","C"],
      explanation:
`**Why B and C are right.** The unit that actually gets independently scheduled is the Service Appointment, and per Salesforce's guidelines its parent record can be either a Work Order or a Work Order Line Item. What matters is that each Asset ends up tied to its own distinct Service Appointment. B creates three separate Work Orders, each with its own appointment — fully independent. C keeps a shared Work Order but gives each Line Item its own Service Appointment, since a Line Item can itself be a Service Appointment's parent — each Asset's visit can still be scheduled and dispatched independently.

**Why A and D are wrong.** Both create only a *single* Service Appointment covering all three Assets — one appointment means one scheduled visit, one resource, one status. A bundles three Line Items under one Work Order-level appointment; D bundles three child Work Orders under one parent-level appointment. Either way, the three containers can't be scheduled or tracked apart from each other.`,
      sources:[
        {l:"Guidelines for Creating Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_appointment_guidelines.htm&type=5"}
      ]
    },
    {
      topic:"Mobile Access",
      select:1,
      prompt:"Some Technicians report that they are unable to log in to the Salesforce Field Service mobile app. The Consultant confirmed that the Technicians have the Salesforce Field Service Resource License and Salesforce Field Service Resource Permissions assigned to them. How should a Consultant provide access to the Salesforce Field Service mobile app?",
      options:[
        {k:"A", t:"Modify the user's Profile."},
        {k:"B", t:"Update Public membership."},
        {k:"C", t:"Modify the user record."},
        {k:"D", t:"Assign a Field Service Mobile License to the user."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce ships a dedicated Permission Set License, "Field Service Mobile," whose specific job is granting "access to the Field Service mobile app" — separate from the base Field Service Resource license (object/field access) and from "Field Service Scheduling" (Gantt/optimization eligibility). Since the technicians already have the base license and permissions but still can't log in, the missing piece is this dedicated mobile license.

**Why A is wrong.** Profiles control baseline object/field/system access, but a Permission Set License is a separate construct that has to be explicitly assigned — editing a Profile doesn't grant it.

**Why B is wrong.** Public Groups govern sharing rules and queue membership; they have no bearing on licensing or app access.

**Why C is wrong.** Standard User record fields (name, email, time zone, etc.) don't control Permission Set License assignment — that's a distinct action.`,
      sources:[
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"},
        {l:"Give Users Access to the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_perms_standard.htm&language=en_US&type=5"},
        {l:"Mobile App Login Error KB — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000383195&language=en_US&type=1"}
      ]
    },
    {
      topic:"Optimization",
      select:1,
      prompt:"An extreme weather situation impacted both the volume of open work and the number of available resources at Universal Containers. Which approach should a Consultant recommend to realign available resources with open work?",
      options:[
        {k:"A", t:"Resource Schedule Optimization"},
        {k:"B", t:"Emergency scheduling"},
        {k:"C", t:"Customer First scheduling"},
        {k:"D", t:"Global optimization"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Global Optimization reschedules all service appointments across a specified time frame and resource pool based on criteria like travel time and priority — a full re-shuffle, not a single-appointment fix. When a weather event changes both the demand side (open work) and the supply side (available resources) at once, a company-wide re-optimization is what's needed to redistribute everything against current conditions — exactly the documented use case for this scenario.

**Why A is wrong.** Optimizing one resource's own route doesn't account for the ripple effects across every other resource and the pool of newly at-risk appointments — too narrow for an operation-wide disruption.

**Why B is wrong.** Emergency is a scheduling *policy* for booking individual urgent appointments quickly — it doesn't perform a bulk reshuffle of the existing schedule and resource pool.

**Why C is wrong.** Customer First prioritizes a customer's preferred resource and earliest slot for individual bookings — it's a per-appointment preference, not a mechanism for realigning a disrupted schedule at scale.`,
      sources:[
        {l:"Global Optimization Planning — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/plan-ahead-with-global-optimization"},
        {l:"Create and Manage Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_scheduling.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Optimization",
      select:2,
      prompt:"The field service administrator at Ursa Major Solar updates the skills on the most common work types to adapt to the increasing complexity of jobs. This change has led to many service appointments to be in violation. There is a global optimization job set up to run nightly that has been working correctly up until this point. The administrator needs to understand why the jobs are still scheduled to resources that lack the appropriate skill level. What are two reasons appointments remaining in violation and are not reassigned?",
      options:[
        {k:"A", t:"Global optimization doesn't reschedule appointments that have rule violations."},
        {k:"B", t:"There are no service resources available with the required skill levels."},
        {k:"C", t:"The optimizer uses a scheduling policy different from what is used on the dispatch console."},
        {k:"D", t:"The territory of the resources was not included in the global optimization request."}
      ],
      correct:["A","B"],
      explanation:
`**Why A is right.** Salesforce Help states it plainly: "when you're not using Enhanced Scheduling and Optimization, rule-violating service appointments can't be optimized." Standard Global Optimization skips over appointments that are already flagged as violating a policy rule — like the newly-tightened skill requirement — rather than trying to fix them, so it passes over them night after night.

**Why B is right.** The trigger event was increasing skill complexity on work types — it's entirely plausible the technician workforce hasn't caught up yet, and no resource in the territory holds the newly required skill or level. Even an engine that *does* attempt to fix violations has no valid candidate to reassign to, so the appointment stays put regardless of the optimizer's technical behavior.

**Why C and D are wrong.** The scenario states the nightly job "has been working correctly up until this point" — its scheduling-policy and territory configuration hasn't changed. If the optimizer were using a mismatched policy or excluding the relevant territory, that would have been a standing defect affecting scheduling broadly, not something that surfaces in lockstep with a skill-requirement change on work types. Since the only thing that changed is the skill data, the explanation has to be something newly triggered by that change — which is A and B, not a pre-existing structural misconfiguration.`,
      sources:[
        {l:"Considerations for Enhanced Scheduling and Optimization — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_enhanced_available_considerations.htm&language=en_US&type=5"},
        {l:"Global Optimization Planning — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/plan-ahead-with-global-optimization"}
      ]
    },
    {
      topic:"Service Appointment Workflow",
      select:1,
      prompt:"Universal Containers has Role-based Technicians and Managers who handle Service Appointments. Many times, Technicians arrive on-site but are unable to gain access to the customer's equipment. In this scenario, only the Manager has permission to cancel the Service Appointment. Who should a Consultant recommend adhering to this business process?",
      options:[
        {k:"A", t:"Assign Permission Sets that allow Status Transitions."},
        {k:"B", t:"Allow Status Transitions based on Role."},
        {k:"C", t:"Limit Status Transitions based on Profile."},
        {k:"D", t:"Configure Status Transitions based on Resource Type."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Field Service's Status Transitions setup is built for exactly this restriction. In the Field Service Admin app, under Field Service Settings → Service Appointment Workflow → Status Transitions, each transition row has a "More Details" option to limit the user Profiles that can make that specific status change. Salesforce's own documentation frames this as the way to "prevent technicians from directly moving appointments to statuses like Cannot Complete or Canceled while allowing managers to do so" — which is the scenario word for word: Technicians shouldn't be able to cancel the appointment when they can't access the equipment, but Managers should.

**Why A is wrong.** Status Transitions in Field Service aren't gated through Permission Set assignment — the configuration screen scopes each transition to Profiles specifically, not Permission Sets. There's no "status transition" permission bundled into a Permission Set to assign here.

**Why B is wrong.** Role in Salesforce governs record-level visibility and the sharing hierarchy (roll-up reporting, data access) — it isn't the mechanism Field Service uses to gate which users can execute a given status change. Status Transitions has no Role-based scoping option.

**Why D is wrong.** Resource Type (Technician, Dispatcher, Crew) is a field on the Service Resource record that affects scheduling and Gantt behavior — it isn't a lever the Status Transitions feature reads from. A Technician resource could still hold a Manager's profile in an unusual setup, so Resource Type isn't what actually enforces this restriction.`,
      sources:[
        {l:"Customize the Field Service Appointment Life Cycle — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_lifecycle.htm&language=en_US&type=5"},
        {l:"Update a Field Service Appointment's Status — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_change_status_manual.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"Universal Containers is tracking customer issues in their call center. Sometimes this requires a Technician to be on-site at the customer's location. What set of steps should a Consultant recommend to dispatch the Technician?",
      options:[
        {k:"A", t:"Create Case, Create Service Appointment, Create Work Order, Dispatch Service Appointment."},
        {k:"B", t:"Create Work Order, Create Case, Dispatch Work Order, Create Service Appointment."},
        {k:"C", t:"Create Service Appointment, Create Work Order, Create Case, Dispatch Service Appointment."},
        {k:"D", t:"Create Case, Create Work Order, Create Service Appointment, Dispatch Service Appointment."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** This is the standard Field Service journey Salesforce documents end to end: a call-center agent logs the customer's issue as a **Case** first. From that Case, a **Work Order** is created capturing the job details (work type, dates, location). The Work Order then gets a **Service Appointment** — often generated automatically when the Work Type has "Auto-Create Service Appointment" enabled — which is the record that actually shows up on the dispatcher's Gantt. Only then does the dispatcher **dispatch the Service Appointment**, assigning and notifying the technician. Case → Work Order → Service Appointment → Dispatch is the documented order, and it makes structural sense too: each record is a child of the one before it, so the parent has to exist first.

**Why A is wrong.** It creates the Service Appointment before the Work Order, but a Service Appointment is normally a child record of a Work Order (or Work Order Line Item) — there'd be nothing yet for it to attach to.

**Why B is wrong.** It creates the Work Order before the Case even exists, which reverses how the issue gets captured (the call center logs a Case first). It also has the dispatcher "Dispatch Work Order" — dispatch is an action performed on the Service Appointment, not the Work Order — and creates the Service Appointment only after dispatching, which is backwards.

**Why C is wrong.** It front-loads the Service Appointment and Work Order before any Case documents the customer's issue at all, which isn't how the process starts in a call-center context.`,
      sources:[
        {l:"Take a Field Service Journey — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/take-a-field-service-journey"},
        {l:"Salesforce Field Service Management Solutions — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_basics/field_service_basics_intro"}
      ]
    },
    {
      topic:"Mobile Capture",
      select:1,
      prompt:"Universal Containers wants Field Technicians to capture customer authorization via a signature through Salesforce mobile app. What should a Consultant recommend?",
      options:[
        {k:"A", t:"Create a Quick Action on the Service Appointment to launch a Visualforce signature page."},
        {k:"B", t:"Create an Approval Process from the Service Appointment for the customer's Authorization."},
        {k:"C", t:"Create a Checkbox on the Service Appointment that will capture the customer's Authorization."},
        {k:"D", t:"Create a custom text field to capture the customer's signature on Salesforce mobile app."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Capturing an actual signature needs a drawable canvas that saves as an image — not just a data field. Salesforce's established pattern for this is a Visualforce page containing a signature-capture canvas (typically built on a JS signature-pad library), packaged as a Quick Action of type Visualforce and added to the record's page layout under "Salesforce1 and Lightning Experience Actions." Placed on the Service Appointment — the record the technician is working when the job wraps up — it lets the customer sign on screen, and the signature gets converted to an image and attached to the record. That's a real, working mechanism for capturing a signature from the mobile app.

**Why B is wrong.** Approval Processes route a record through a sequence of approvers for internal sign-off on a decision — they don't render a drawing surface or capture any image. It solves a different problem entirely (approval routing, not signature capture).

**Why C is wrong.** A checkbox only stores true/false. It can record "authorization was given," but it has no way to capture what a signature actually is — a customer-drawn mark of consent.

**Why D is wrong.** A text field holds typed characters, not a drawing. A signature is graphical; at best a text field would capture a typed name, which isn't a captured signature.`,
      sources:[
        {l:"How to Capture E-Signature Using Salesforce1", u:"https://medium.com/my-journey-with-salesforce1-platform/how-to-capture-e-signature-using-salesforce1-acbc567f6156"},
        {l:"Capture E-Signatures with Lightning Web Components on Mobile — Salesforce Developers Blog", u:"https://developer.salesforce.com/blogs/2023/07/capture-e-signatures-with-lightning-web-components-on-mobile"}
      ]
    },
    {
      topic:"Mobile Capture",
      select:1,
      prompt:"A Company would like to provide Field Service Technicians the ability to capture details and customer approval on completed work so that the details can be compiled and sent to the customer electronically. What should a Consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Create a custom report."},
        {k:"B", t:"Create a Process Builder to generate a report."},
        {k:"C", t:"Use the standard Work Order email template."},
        {k:"D", t:"Use the standard Service Report."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's documentation describes the Service Report as exactly this: a PDF that "summarize[s] the work that was performed" on a Work Order or Service Appointment, can be "signed by the mobile worker, customer, and others involved in the work," and can be "email[ed] directly to customers" once generated. That covers the whole requirement — capture work details, capture customer approval via signature, and deliver it electronically — and it's a standard, out-of-the-box Field Service feature that's customizable through Service Report templates rather than something built from scratch.

**Why A is wrong.** A custom report only surfaces data inside Salesforce as rows/summaries — it has no way to capture a signature and isn't a document you hand to or email a customer as a polished record of the work.

**Why B is wrong.** Process Builder automates record updates and notifications when data changes; it doesn't generate a formatted, signable PDF of completed work.

**Why C is wrong.** There's no standard "Work Order email template" built for this purpose in Field Service — email templates send text/merge-field emails, not a signed PDF summary of completed work.`,
      sources:[
        {l:"Create Service Reports in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_service_report.htm&language=en_US&type=5"},
        {l:"Set Up Field Service Reports — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_set_up_customer_reports.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A Company's products need to be traceable from the factory to customer sites. The products are installed using disposable kits. How should the consultant configure this?",
      options:[
        {k:"A", t:"Create the products and the installation kits as serialized inventory."},
        {k:"B", t:"Create the products as serialized inventory and the installation kits as unserialized inventory."},
        {k:"C", t:"Create the products and the installation kits as a single serialized product."},
        {k:"D", t:"Create the products and the installation kits as unserialized inventory."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce draws a clear line between the two: serialized products carry individual-unit traceability — each unit gets its own serial number, its own Product Item record, and a transaction history as it moves between locations — exactly what's needed to trace a product "from the factory to customer sites." Unserialized inventory only tracks aggregate quantity at a location, with no per-unit identity. A disposable installation kit is consumed during the install and has no ongoing lifecycle worth tracing unit by unit — the business only cares how many are on hand and how many got used, which is what quantity-based (unserialized) tracking is for. So the traceable product gets serialized inventory, and the disposable kit gets unserialized inventory.

**Why A is wrong.** Serializing the disposable kits adds pointless overhead — assigning and tracking a unique serial number for something consumed on install and never traced again serves no purpose.

**Why C is wrong.** The product and the kit are two distinct items with different lifecycles — a traceable durable good and a disposable consumable. Collapsing them into a single serialized product loses the ability to track the actual product's serial-level history independent of the kit.

**Why D is wrong.** This fails the core requirement outright — unserialized tracking only records quantities, not individual unit identity, so the product could never actually be traced to a specific customer site.`,
      sources:[
        {l:"Create Serialized Inventory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_serialized_inventory.htm&language=en_US&type=5"},
        {l:"Manage Serialized Inventory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_learn_serialized_products.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company wants to standardize the creation of Work Orders. Historically, Work Orders have been set up with the incorrect skills and estimated time to completion. What should a Consultant utilize to meet this requirement?",
      options:[
        {k:"A", t:"Entitlements"},
        {k:"B", t:"Work Order Record Types"},
        {k:"C", t:"Work Types"},
        {k:"D", t:"Entitlement Templates"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce documentation describes Work Types as templates that exist specifically "to standardize your field service work." A Work Type predefines an Estimated Duration and a set of Required Skills once; when it's applied to a Work Order or Work Order Line Item, that record "inherits settings from the work type" — locking in a consistent duration estimate and the correct skill requirements automatically, instead of relying on whoever creates the Work Order to enter them correctly by hand. That directly fixes the stated problem of inconsistent skills and time-to-completion estimates.

**Why A is wrong.** Entitlements define the support/warranty terms and SLA a customer or asset is covered under (response times, coverage windows) — they govern service eligibility, not the skill or duration defaults that get set on a Work Order.

**Why B is wrong.** Record Types control which page layout, picklist values, and business process apply to a Work Order. They don't carry an estimated duration and don't drive skill requirements — they shape the form, not the default data on it.

**Why D is wrong.** Entitlement Templates are just reusable Entitlement definitions — the same category as A, unrelated to standardizing skills or time estimates on Work Orders.`,
      sources:[
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"},
        {l:"Creating Work Types for Field Service — Trailhead", u:"https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type"}
      ]
    },
    {
      topic:"Mobile Knowledge",
      select:1,
      prompt:"A Company wants technicians to view work progress through the work order line-item in the field service lightning mobile app. Which configuration steps should a consultant take to meet this requirement?",
      options:[
        {k:"A", t:"Create a custom lightning component that displays work order progress and deploy it to technicians through the field service lightning mobile app."},
        {k:"B", t:"Add the work order line items related list of the work order page layout and assign the layout to the technician's profile."},
        {k:"C", t:"Create a report chart that summarizes work order line items and add a link to the service appointment layout."},
        {k:"D", t:"Create a custom Visualforce page and add an external link in the field service lightning mobile app to view the page in the mobile browser."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Field Service mobile app surfaces related records through a "Related" tab that mirrors whatever related lists are configured on the underlying object's page layout — the same mechanism Salesforce documents for Knowledge articles, where technicians "tap Related in the work order carousel" to see records attached via the Work Order's page layout. Work Order Line Items are a standard related list on the Work Order object, so putting it on the page layout assigned to the technician's profile is all that's needed — the mobile app then shows live line-item progress under that Related tab with zero custom development. It's also the lowest-cost, most maintainable option: pure declarative configuration, no code to build or support.

**Why A is wrong.** Unnecessary custom development for something the platform already exposes natively via a related list — adds build and maintenance cost with no functional benefit over B.

**Why C is wrong.** A report chart is a static/aggregate summary, not the live, individual Work Order Line Item records technicians need to track real-time job progress against — and linking it from the Service Appointment layout doesn't put it where line-item status actually lives.

**Why D is wrong.** This routes technicians out of the Field Service mobile app into a separate browser view — extra custom code and a worse in-app experience, when the standard related list already renders inside the app itself.`,
      sources:[
        {l:"View Knowledge Articles in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_knowledge.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_appointment_guidelines.htm&type=5"}
      ]
    },
    {
      topic:"Scheduling Policies",
      select:1,
      prompt:"A Company wants to prevent the lunch break from interfering with existing scheduled work. How should a Consultant configure the Scheduling Policy to ensure a 30-minute lunch break begins every day after 1 PM?",
      options:[
        {k:"A", t:"Resource Availability Rule"},
        {k:"B", t:"Create a recurring Service Appointment."},
        {k:"C", t:"Use appropriate Resource Operating Hours."},
        {k:"D", t:"Create Resource Absences every day."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The Service Resource Availability work rule — the "Resource Availability Rule" that's mandatory on every scheduling policy — is where Salesforce documents the break-configuration fields themselves: Break Start and Break Duration. Set once (Break Start = 1:00 PM, Break Duration = 30 minutes), the scheduling engine "ensures that the service resource takes a break either at the set Break Start time or immediately after the last appointment that started before the Break Start" — automatically, every day, for as long as the rule is active. Crucially, it's built to satisfy exactly the stated requirement: rather than blindly forcing a break into an occupied slot, the engine shifts it forward around existing scheduled work so the break never collides with a job already on the books. One rule, applied continuously — no daily record-keeping required.

**Why B is wrong.** A recurring Service Appointment would just place a fake "job" on the calendar every day. It has to be manually created and re-created, is optimized and can be moved, rescheduled, or double-booked like any other appointment, and isn't a scheduling constraint the engine treats as a protected break — it's a workaround, not a break mechanism.

**Why C is wrong.** Resource Operating Hours (and their Time Slots) define the outer boundaries of a resource's working day — e.g., 8 AM–5 PM — not an in-day break carved out of otherwise continuous availability. There's no Break Start/Break Duration field on Operating Hours, and splitting hours into two blocks every day couldn't dynamically shift around already-scheduled work the way the Resource Availability Rule does.

**Why D is wrong.** Resource Absences model exceptions — time off, illness, one-off unavailability — logged per resource per occurrence. Creating one every single day for a routine recurring break is exactly the manual, non-scalable anti-pattern a "configure it once, applies every day" requirement is meant to eliminate.`,
      sources:[
        {l:"Work Rule Type: Service Resource Availability — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_service_resource_availability.htm&language=en_US&type=5"},
        {l:"How the Lunch Break Logic Works in the Salesforce Field Service Managed Package — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000392368&language=en_US&type=1"}
      ]
    },
    {
      topic:"Appointment Booking",
      select:1,
      prompt:"A Company offers 2-hour versus 4-hour appointment booking windows for Gold versus Standard customers. What should a Consultant recommend to offer appropriate appointment booking windows?",
      options:[
        {k:"A", t:"Service Due Date"},
        {k:"B", t:"Service Urgency"},
        {k:"C", t:"Customer Entitlement"},
        {k:"D", t:"Customer Working Hours"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** This is a documented, named Salesforce pattern — Field Service's own Operating Hours guidance states it almost verbatim: "If different appointment booking windows are needed for different level of service, add entitlements to your work orders. For example, standard customers get 4-hour booking windows while VIP customers get 2-hour windows." The mechanism is to build a dedicated Operating Hours record for each window size (one with 2-hour slots, one with 4-hour slots) and then set that Operating Hours on the Entitlement record tied to each service tier. A Gold customer's Work Order carries the Gold Entitlement → 2-hour-slot Operating Hours; a Standard customer's Work Order carries the Standard Entitlement → 4-hour-slot Operating Hours. Entitlements are exactly Salesforce's object for encoding "what level of service does this customer get," so tiering booking-window size by Entitlement is the supported, scalable answer.

**Why A is wrong.** Service Due Date is just a deadline field on the Work Order/Work Order Line Item — it says *when* work must be done, not *how wide* the customer-facing appointment window is.

**Why B is wrong.** Service Urgency (or Priority) affects scheduling order and which jobs get bumped ahead of others — it drives dispatch prioritization, not the size of the arrival window quoted to a customer at booking time.

**Why D is wrong.** Customer Working Hours describes when the customer/site is available to receive a visit (e.g., business open 9–5) — it constrains *which* hours are offered at all, not the *width* of the booking slot within those hours, and it isn't a lever for tiering service by customer segment the way Entitlements are.`,
      sources:[
        {l:"Operating Hours Considerations for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_oh_considerations.htm&language=en_US&type=5"},
        {l:"Entitlements: Terms to Know — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.entitlements_terms.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Dispatching",
      select:1,
      prompt:"A Company is implementing drip feed dispatching. When testing the new functionality, the drip does not dispatch appointments as expected. A Consultant is engaged to troubleshoot the issue. What is preventing the drip feed from triggering?",
      options:[
        {k:"A", t:"Other scheduled jobs are dispatching appointments and exceeding the drip feed value."},
        {k:"B", t:"The status on completed appointments can only be Canceled, Completed, or Cannot Complete."},
        {k:"C", t:"The appointment status is going from Scheduled to Completed."},
        {k:"D", t:"The default drip feed setting is overriding the drip feed rate on a service territory."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Drip feed works off a cap: it keeps only a set number of appointments Dispatched/In-Progress for a resource at once, and pushes out a new one only when that count drops below the cap. If a separate process — another scheduled Apex job, a Flow, a second automation — is also independently dispatching appointments to the same resource outside of the drip feed flow, it can push the resource's currently-dispatched count to or past the drip feed limit on its own. Once that ceiling is already exceeded by outside activity, drip feed's own "is there room for one more?" check never passes, so it never fires — even though everything about the drip feed configuration itself is correct. That's the kind of issue a consultant has to trace by checking for other automation touching the same appointments, not by second-guessing the drip feed setup.

**Why B is wrong.** Canceled, Completed, and Cannot Complete are the normal, valid closing statuses for a dispatched appointment — restating that fact describes expected behavior, not a malfunction, so it can't be the answer to "what's preventing" the trigger.

**Why C is wrong.** A status moving from Scheduled to Completed is a valid transition for an appointment that's been dispatched and finished — it doesn't by itself interfere with drip feed dispatching.

**Why D is wrong.** This has the precedence backward. A service territory's drip feed rate overrides the org-wide default — the default is a fallback used only when no territory/resource-level rate is set — not the other way around. Since the scenario in D can't actually happen as described, it isn't a valid explanation for the malfunction.`,
      sources:[
        {l:"Automatically Dispatch Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatching_appointments.htm&language=en_US&type=5"},
        {l:"Customize Dispatcher Console Settings — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/dispatcher-console-for-admins/customize-dispatcher-console-settings"}
      ]
    },
    {
      topic:"Mobile Knowledge",
      select:1,
      prompt:"A Company wants to deploy knowledge to its field team. How should A Company ensure its technicians can access Knowledge articles offline?",
      options:[
        {k:"A", t:"Use the Salesforce Mobile App with deep linking to the Field Service Lightning Mobile App."},
        {k:"B", t:"Use work types to assign associated articles to work order."},
        {k:"C", t:"Write a workflow that associates articles to work orders based on a picklist on the work order."},
        {k:"D", t:"Create a custom Mobile App that syncs articles based on service appointment assignments."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce documents Work Types as the scalable way to standardize which articles a job needs: "You can also attach knowledge articles to work types to put the right specs and instructions at your team's fingertips. A work type's attached articles show up on work orders and work order line items that use the work type." Once attached that way, the article rides along on every Work Order created from that Work Type — no manual re-attaching per job — and the Field Service mobile app already surfaces articles attached to a Work Order or Work Order Line Item on the Knowledge card technicians see offline as part of their normal work-order data. For a company-wide rollout across a whole field team, tagging articles at the Work Type level (dozens of work orders, one article set) is exactly the declarative, low-maintenance mechanism built for this.

**Why A is wrong.** "Deep linking" between the Salesforce Mobile App and the Field Service mobile app describes jumping between two separate apps — it isn't a real mechanism for surfacing or caching Knowledge content, and hopping between apps requires connectivity, which defeats the stated offline requirement entirely.

**Why C is wrong.** Attaching a Knowledge Article isn't a field update — it's adding a related-list junction record — and that's not something a classic Workflow Rule can do. Beyond being technically the wrong tool, it reinvents (with custom logic to maintain) something Work Types already do natively and more reliably.

**Why D is wrong.** Building a custom mobile app is a large, costly undertaking to replicate functionality the standard Field Service mobile app already provides out of the box once articles are attached via Work Type — unnecessary custom development for a solved problem.`,
      sources:[
        {l:"Attach Knowledge Articles to Work Orders or Work Types — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_attach_articles.htm&language=en_US&type=5"},
        {l:"Create Work Types for Field Service — Trailhead", u:"https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type"}
      ]
    },
    {
      topic:"Dispatching",
      select:2,
      prompt:"A Company wants to dispatch groups of Service Appointments to their Technicians. The number of Service Appointments dispatched at a time varies among different Service Territories. Which two settings should a Consultant enable to ensure Service Appointments are dispatched correctly?",
      options:[
        {k:"A", t:"Set the Service Appointment to Dispatch in the Field Service Settings."},
        {k:"B", t:"Set the Number of Services to Drip Feed on the Service Territory."},
        {k:"C", t:"Enable Sharing of Dispatched Service Appointments."},
        {k:"D", t:"Enable Drip Feed Dispatching in Field Service Settings."}
      ],
      correct:["B","D"],
      explanation:
`**Why D is right.** Drip feed dispatching — sending out a controlled group of appointments and refilling the queue as each one finishes, rather than dumping the whole day's schedule on a technician at once — is an org-wide feature that starts turned off. It's switched on via the "Enable Drip Feed Dispatching" checkbox in Field Service Settings (Dispatch → Drip Feed). Without this base toggle on, none of the per-territory tuning in B has anything to act on.

**Why B is right.** Once drip feed is enabled, the org-wide default group size isn't necessarily right for every territory. Salesforce documents exactly this override: "To dispatch a different number of service appointments per territory, use the Number of Services to Drip Feed field on the Service Territory object. This field overrides the org-wide setting." That's precisely the stated requirement — the count needs to vary by Service Territory — so this per-territory field is the second piece needed alongside the org-wide toggle.

**Why A is wrong.** There's no "Service Appointment to Dispatch" toggle in Field Service Settings — this option blends the real "Service Appointment is sent to its resource" status setting (which defines *which status value* represents "dispatched," not how many go out at once) with invented wording, and it doesn't touch grouping or per-territory counts at all.

**Why C is wrong.** There's no documented "Sharing of Dispatched Service Appointments" setting governing drip feed behavior — sharing rules control record visibility, not dispatch batch size, and enabling something like it wouldn't make appointment counts vary by territory.`,
      sources:[
        {l:"Customize Dispatcher Console Settings — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/dispatcher-console-for-admins/customize-dispatcher-console-settings"},
        {l:"Drip Feed Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatch_drip_feed.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Entitlements & Milestones",
      select:1,
      prompt:"When customers call in for support at A Company, a case is always created. If the issue cannot be solved without dispatching a technician, a work order is created from the case. Milestones are currently being used on cases, and support operations would like to extend the use of milestones to the work orders. To meet this requirement, the system administrator added the Milestone Lightning component to the work order Lightning record page. Technicians and managers are reporting that there are no milestones listed when viewing the record. How should this issue be resolved?",
      options:[
        {k:"A", t:"Add work order milestones after the case milestones to the entitlement process."},
        {k:"B", t:"Make sure the case entitlement record is being shared with the service resource."},
        {k:"C", t:"Create a separate entitlement process associate to the work order object."},
        {k:"D", t:"Ensure the work order entitlement is related to the same process as the case entitlement."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Milestones only ever come from an Entitlement Process, and Salesforce locks each process to a single object type at creation: "Entitlement processes only run on records that match their type — so you can't use the same entitlement process for cases and work orders." For a Case-scoped milestone timeline, that process can never drive Work Order milestones, no matter what component sits on the Work Order page layout. The fix is to build a second, Work-Order-scoped Entitlement Process with its own milestones, then attach a Work Order Entitlement built on that process to the Work Order record. Only once the Work Order actually has an Entitlement pointing at a Work-Order-type process with matching milestone criteria will the Lightning component have anything to display — dropping a UI component onto a layout doesn't manufacture the underlying data.

**Why A is wrong.** This asks to extend the *existing Case* entitlement process with Work Order milestones — exactly the mixed-object-type setup Salesforce documentation says isn't possible. An entitlement process built for Case records can't also carry Work Order milestone criteria.

**Why B is wrong.** Sharing controls record *visibility*, not whether milestone records get generated. Even with perfect sharing, a Case-type entitlement structurally can't produce Work Order milestones — the object-type mismatch is the real blocker, not who can see the record.

**Why D is wrong.** Same root problem as A: a Work Order's Entitlement can't be "related to the same process" as the Case's Entitlement, because that process is bound to the Case object type. This describes a configuration Salesforce doesn't allow, so it can't be the fix.`,
      sources:[
        {l:"Use Entitlements with Work Orders — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders"},
        {l:"Milestones Do Not Appear on a Salesforce Case Record — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000386849&language=en_US&type=1"}
      ]
    },
    {
      topic:"Sharing & Access",
      select:1,
      prompt:"A Company uses a private record access model in the sales, support, and field service organizations. How should the system administrator ensure that the technicians have the appropriate access to the service appointments dispatched to them?",
      options:[
        {k:"A", t:"Configure a sharing rule to share dispatched service appointments with the assigned resource."},
        {k:"B", t:"Enable the sharing features in the Field Service Settings in the Setup menu."},
        {k:"C", t:"Create a user territory for the technicians' primary and secondary territories."},
        {k:"D", t:"Create a process to change the owner of the service appointment to the assigned technician."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Field Service ships this exact scenario as a native, named setting: "Share dispatched service appointments with their assigned resources," found under Field Service Settings → Sharing in Setup. Salesforce documents these as **Field Service Settings**, not custom sharing rules — turning this one on is what actually grants a technician access to the Service Appointments assigned to them under a private model, with no custom sharing rule, ownership change, or territory setup required.

**Why A is wrong.** This describes hand-building a custom sharing rule to replicate something Salesforce already ships as a one-click toggle in Field Service Settings — more setup and more to maintain for no benefit over the native option.

**Why C is wrong.** User Territories with Public Groups are the documented mechanism for **dispatcher** access — sharing an entire service territory's resources and appointments with the dispatchers who manage it — not for granting an individual technician access to the specific appointments dispatched to *them*. It solves a different access problem.

**Why D is wrong.** Reassigning ownership to the technician is a heavy, non-standard workaround: it would disrupt dispatcher-facing views and automation that rely on the appointment's existing owner (often a queue or the dispatcher), and Salesforce provides a purpose-built sharing setting specifically so ownership doesn't have to change.`,
      sources:[
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_sharing.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:1,
      prompt:"A Company has 140 service resources who handle 2,400 service appointments per day. How should A Company define Service Territories to ensure a high quality of optimization and dispatcher experience?",
      options:[
        {k:"A", t:"Three Service Territories with fewer than 50 resources"},
        {k:"B", t:"Five Service Territories with fewer than 500 Service Appointments per day"},
        {k:"C", t:"One Service Territory with four Polygons"},
        {k:"D", t:"Two Service Territories that split the Service Resources evenly"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce publishes exact sizing guidance for this: "Try to stay within these suggested limits when designing your service territories: Up to 50 service resources per service territory, Up to 1,000 service appointments per day per service territory." Running the numbers — 140 resources ÷ 50 = 2.8, and 2,400 appointments ÷ 1,000 = 2.4 — both limits require at least 3 territories to stay within bounds. Three territories lands right at that minimum: about 47 resources and 800 appointments per territory, comfortably under both documented ceilings, with no more fragmentation than necessary. Salesforce is explicit about *why* this matters: "If a service territory is too large and many service resources and dispatchers are assigned to it, optimization and dispatching become cumbersome" — oversized territories slow the optimizer and overload the dispatcher's view.

**Why B is wrong.** 500 appointments/day isn't a Salesforce-documented threshold — the real ceiling is 1,000/day — and five territories is more splitting than the numbers require. Over-fragmenting territories beyond what's needed adds its own coordination overhead without a documented benefit.

**Why C is wrong.** A single territory holding all 140 resources and 2,400 appointments blows past *both* documented limits (50 resources, 1,000 appointments/day) regardless of how many polygons subdivide its geography — polygons shape geographic boundaries within a territory, they don't relieve the resource/appointment ceiling that drives optimization and dispatch performance.

**Why D is wrong.** Two territories put roughly 70 resources and 1,200 appointments/day in each — over both documented limits — so this still leaves the org in the "cumbersome" zone Salesforce warns against.`,
      sources:[
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company wants service managers to quickly identify status changes in the lifecycle of a specific component in a customer's install base. What should a Consultant utilize to track the lifecycle?",
      options:[
        {k:"A", t:"A Product related list on Assets"},
        {k:"B", t:"Custom fields for change tracking on Assets"},
        {k:"C", t:"Field History Tracking on Assets"},
        {k:"D", t:"A Work Order Related list on Assets"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** An installed component is modeled as an Asset, and Salesforce's native, purpose-built mechanism for exactly "quickly identify status changes over time" is Field History Tracking: "Select certain fields to track and show field history in an object history list," recording "the date, time, nature of the change, and who made the change." Turning it on for the Asset's Status field gives service managers a ready-made, timestamped audit trail — who moved the component from, say, Installed to Registered to Out of Service and when — with zero custom development.

**Why A is wrong.** The Product related list connects an Asset to the Product it's an instance of (catalog/spec data) — it's static reference information, not a log of how the Asset's own status has changed over time.

**Why B is wrong.** Hand-building custom fields (and the automation needed to populate them on every status change) reinvents, with ongoing maintenance overhead, something the platform already tracks natively and declaratively via Field History Tracking.

**Why D is wrong.** A Work Order related list surfaces the service jobs performed against the Asset — useful for service history, but it doesn't capture the Asset's own field-level status transitions, which is specifically what the requirement asks for.`,
      sources:[
        {l:"Field History Tracking — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=xcloud.tracking_field_history.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:2,
      prompt:"A Company wants to ensure Technicians have the correct equipment before arriving at a Job site. Which two considerations should the Consultant take into account when configuring Salesforce Field Service?",
      options:[
        {k:"A", t:"Required Products must be added to both the Work Order and all Work Order Line Items."},
        {k:"B", t:"Quantity and Unit of Measure are required when adding a Required Product."},
        {k:"C", t:"Work Types can be configured to include Required Products on Work Orders and Work Order Line Items."},
        {k:"D", t:"Validation Rules and Triggers created on the Work Order and Work Order Line Item objects are automatically recreated for Work Types."}
      ],
      correct:["A","C"],
      explanation:
`**Why C is right.** Salesforce documents this exact time-saver: "Work orders and work order line items inherit their work type's required products." Attach the parts a job needs once, at the Work Type — e.g., the bulbs and fixtures for a "Light Bulb Replacement" work type — and every Work Order and Work Order Line Item created from that Work Type automatically carries the same required-parts list, no manual re-entry per job.

**Why A is right.** Products Required entries on a Work Order and on its Work Order Line Items are independent related lists — adding a required product at the Work Order level doesn't propagate it down to the line items, and vice versa (only the Work Type-level inheritance in C is automatic). So a consultant has to actively plan for and populate required products at whichever level — or both — technicians will actually be viewing in the field, or parts can end up listed somewhere a technician never checks.

**Why B is wrong.** On the ProductRequired object, both Quantity Required and Quantity Unit of Measure are nillable — optional, not mandatory — fields. The add-a-required-product flow walks through entering them, but the platform doesn't enforce that they be filled in.

**Why D is wrong.** Validation Rules and Triggers are automation built against a specific object's metadata — Work Order, Work Order Line Item, and Work Type are three separate objects. Nothing in Salesforce "automatically recreates" one object's validation rules or triggers on another; that would have to be built and maintained separately for each object if needed.`,
      sources:[
        {l:"Track Required Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_products_required.htm&language=en_US&type=5"},
        {l:"ProductRequired — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productrequired.htm"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company wants to report on the volume of products installed within a specific timeframe. Which solution should the consultant utilize to meet the requirement?",
      options:[
        {k:"A", t:"A work order related list on asset"},
        {k:"B", t:"A custom installation date field on products consumed"},
        {k:"C", t:"Field history tracking on asset"},
        {k:"D", t:"The standard installation date field on asset"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Asset already ships with a standard field for exactly this: Install Date, documented simply as "Date the asset was installed." Since every installed component is modeled as an Asset, a straightforward report on Assets filtered or grouped by Install Date within the target window directly answers "volume of products installed in a timeframe" — no custom fields, no automation, just native reporting on a field the object already has.

**Why A is wrong.** A Work Order related list surfaces the service jobs performed against an Asset — useful for service history, but it doesn't represent a report-ready count of installations by date; it's the wrong object relationship for a volume-over-time question.

**Why B is wrong.** Building a custom field on Products Consumed duplicates data the Asset object already carries natively via Install Date, and Products Consumed tracks parts used during service work, not primarily the installed-asset record itself — unnecessary custom development for a solved problem.

**Why C is wrong.** Field History Tracking logs changes to a field's value over time (an audit trail) — it's built for "what changed and when," not for a simple count/report of records whose Install Date falls in a range. Install Date is typically set once and doesn't change, so there's nothing for history tracking to usefully capture here.`,
      sources:[
        {l:"Asset Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.assets_fields.htm&type=5"}
      ]
    },
    {
      topic:"Products & Pricing",
      select:1,
      prompt:"A Company is deploying Field Service Lightning in Europe, where pricing varies by country. What Price Book structure is recommended?",
      options:[
        {k:"A", t:"Utilize a standard Price Book specific to each country."},
        {k:"B", t:"Utilize a standard Price Book with pricing rules applied."},
        {k:"C", t:"Utilize a custom Price Book specific to each country."},
        {k:"D", t:"Utilize a custom Price Book with pricing rules applied."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce documents this exact scenario almost word for word: "Create a separate price book for each set of customers that you want to address. For example, if you have one set of prices for domestic customers and another for international customers, create a domestic price book and an international one." Custom Price Books are described as "ideal for offering products at different prices to different market segments, regions, or other subsets of your customers" — precisely the country-by-country pricing this deployment needs. The standard Price Book stays untouched as the master catalog, while a custom Price Book per country carries that country's local prices.

**Why A is wrong.** This describes something Salesforce doesn't allow: "You can have only one standard price book" per org. There's no such thing as multiple "standard" price books, one per country — that flexibility is exactly what custom Price Books exist to provide.

**Why B is wrong.** Same problem as A (only one standard Price Book can ever exist), and "pricing rules" that dynamically adjust price aren't a native standard Price Book capability — that's a Salesforce CPQ concept, not part of base Price Book functionality the question is asking about.

**Why D is wrong.** A single custom Price Book with pricing rules layered on top to fake country-level variation is unnecessarily complex compared to Salesforce's actual documented pattern of one custom Price Book per region — and, as with B, "pricing rules" isn't a standard Price Book feature without CPQ in play.`,
      sources:[
        {l:"Manage Price Books — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pricebooks_landing_page.htm&language=en_US&type=5"},
        {l:"Set Up a Standard Price Book — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.comm_standard_pricebook.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Resources & Licensing",
      select:1,
      prompt:"One of a company's customers reported that the Technician sent to their site left without cleaning up the work area afterward. How can a company ensure that a different Technician is assigned all future work for that Customer?",
      options:[
        {k:"A", t:"Remove the Technician as a Preferred Resource."},
        {k:"B", t:"Assign the Technician to a new Service Territory."},
        {k:"C", t:"Create an Excluded Resource for the Account."},
        {k:"D", t:"Create a new Work Order Validation Rule."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** This is a documented Salesforce pattern that matches the scenario almost exactly: "If your customer had a bad experience with Nigel, a service resource, create a resource preference on the customer's account that designates Nigel as Excluded. The Excluded Resource work rule in the scheduling policy ensures that Nigel isn't assigned service appointments from this account." Creating a Resource Preference of type Excluded on the customer's Account, with the Excluded Resources work rule active in the scheduling policy, is the built-in mechanism that actively blocks that specific technician from ever being scheduled to that specific customer again — exactly "a different Technician is assigned all future work."

**Why A is wrong.** Removing a Preferred designation only takes away a positive nudge toward that resource — it doesn't stop the optimizer from assigning them; without an active Excluded preference, the technician remains fully eligible for that customer's future jobs.

**Why B is wrong.** Reassigning the technician to a different Service Territory is a blunt, unrelated instrument — it doesn't guarantee the customer falls outside that territory, doesn't scope to this one customer specifically, and isn't the documented tool for a customer-level scheduling exclusion.

**Why D is wrong.** Validation Rules enforce data-entry conditions when a record is saved — they have no influence over which technician the scheduling optimizer assigns to a job, so they can't drive this kind of assignment behavior at all.`,
      sources:[
        {l:"Add Service Resource Preferences in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=fs_resource_preferences.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:2,
      prompt:"A Company's Technicians may be assigned to Jobs with an arrival window to meet the customer appointment time preference. Technicians are also assigned to Jobs without a preferred appointment time. In which two ways should the Consultant define Operating Hours to meet this requirement?",
      options:[
        {k:"A", t:"The Maintenance Plan for the Account"},
        {k:"B", t:"The Time Slots for Appointment Booking"},
        {k:"C", t:"The Due Date of the Service Appointment"},
        {k:"D", t:"When Service Resources are available for work"}
      ],
      correct:["B","D"],
      explanation:
`**Why B and D are right.** Salesforce documents Operating Hours as serving multiple distinct roles, spelling out exactly this split: "Operating hours in Field Service can represent the availability of a mobile worker for scheduled work (defined on the Service Territory or Service Territory Member record), appointment booking arrival windows (defined as a default in Field Service Settings, or per Work Order, via Entitlements), and customer availability requirements." That maps directly onto the two scenarios here — jobs booked with a customer-preferred arrival window need an Operating Hours record built with Time Slots for Appointment Booking (B), while jobs with no preferred time just need the technician scheduled against their normal working hours — Operating Hours defining when Service Resources are available for work (D). Two distinct Operating Hours records, one per use case, is the standard pattern.

**Why A is wrong.** A Maintenance Plan generates recurring Work Orders on a schedule — it has nothing to do with configuring Operating Hours or arrival windows.

**Why C is wrong.** The Due Date on a Service Appointment is just a target completion deadline; it isn't a mechanism for defining Operating Hours or shaping either type of appointment window described here.`,
      sources:[
        {l:"Create Operating Hours for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_oh_create.htm&language=en_US&type=5"},
        {l:"Operating Hours Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_oh_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Mobile Access",
      select:1,
      prompt:"Geolocation tracking is enabled for a company's Technicians but should only apply to full-time employees. How can geolocation tracking for contractors be disabled?",
      options:[
        {k:"A", t:"Uncheck the Geocoding field on the Contractor's profile."},
        {k:"B", t:"Uncheck the Collect Service Resource Geolocation History field in Field Service Mobile Settings."},
        {k:"C", t:"Set the Geolocation Update Frequency field to zero for contractors."},
        {k:"D", t:"Add the Exclude Technician from Geolocation Tracking permission to a permission set and assign it to contractors."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce ships exactly this as a named System Permission: "Exclude Technician from Geolocation Tracking." The documented process is to create a permission set (Field Service Mobile license), enable that System Permission on it, and assign the permission set only to the users who should be excluded — contractors, in this case. Because it's assigned per-user through a permission set, full-time employees keep being tracked while contractors don't, exactly satisfying "should only apply to full-time employees."

**Why A is wrong.** There's no standard "Geocoding" field on a Profile in Salesforce — this option references a field that doesn't exist.

**Why B is wrong.** This setting (if toggled) would turn off geolocation history collection organization-wide, for every technician — it's a blunt, all-or-nothing switch, not a way to selectively exempt just the contractor population while keeping full-time employees tracked.

**Why C is wrong.** There's no documented "Geolocation Update Frequency" field for this purpose — it isn't part of Salesforce's exclusion mechanism, which works through the permission set assignment described in D.`,
      sources:[
        {l:"Exclude Specific Mobile Workers From Location Tracking — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.mfs_resource_tracking_exclude.htm&type=5"}
      ]
    },
    {
      topic:"Scheduling & Complex Work",
      select:1,
      prompt:"A company performs multi-stage jobs, where the second job can only begin after completion of the first job. How should a Consultant recommend implementing this process?",
      options:[
        {k:"A", t:"Create one Service Appointment and schedule it to two different Resources."},
        {k:"B", t:"Create two Service Appointments and schedule them to the same Resource."},
        {k:"C", t:"Create one Service Appointment with the total duration of the two jobs and assign two resources."},
        {k:"D", t:"Create two Service Appointments, set the Related Service Appointment and Time Dependency."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** This is Salesforce's documented "Complex Work" / scheduling-dependencies mechanism, built for exactly this scenario: multi-stage jobs where one job can't start until another finishes. Salesforce's own setup documentation for this feature confirms the model is two separate Service Appointments linked together, with a "Related Service Appointment" field pointing from one appointment to the other and a "Time Dependency" (Dependency) field carrying the ordering rule — with picklist values like "Start After Finish" ("one appointment can't start until the other is complete"), "Same Start," "Start After Finish and Same Day," and "Immediately Follow." Modeling the two stages as two dependent Service Appointments preserves independent tracking, resourcing, and status for each stage while letting the scheduling engine enforce the "second job starts only after the first completes" constraint.

**Why A is wrong.** A single Service Appointment can't be "scheduled to two different Resources" as two sequential jobs — it's one record with one lifecycle. This doesn't create two distinguishable stages at all, let alone enforce that the second can't start until the first is done.

**Why B is wrong.** Creating two Service Appointments and assigning them to the same Resource controls *who* does the work, not *when*. Without an explicit dependency, nothing stops the scheduling optimizer (or a dispatcher) from scheduling both appointments at the same time or in the wrong order — there's no system-enforced sequencing.

**Why C is wrong.** Merging both jobs into one Service Appointment with a combined duration and two assigned resources collapses the two stages into a single unit of work. That loses the ability to track, complete, or report on each stage independently, and it doesn't actually express a "don't start the second part until the first part is finished" rule — both resources would effectively be tied to the same single appointment window.`,
      sources:[
        {l:"Complex Work in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_complex_work.htm&language=en_US&type=5"},
        {l:"Set Up Complex Work — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_complex_work_setup.htm&language=en_US&type=5"},
        {l:"Considerations and Limitations for Complex Work — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_complex_work_considerations.htm&type=5"}
      ]
    },
    {
      topic:"Preventive Maintenance",
      select:1,
      prompt:"To ensure that preventative maintenance work can be completed on time, A Company wants to automatically generate Work Orders 14 days before the next suggested maintenance date. How should the Consultant meet this requirement?",
      options:[
        {k:"A", t:"Define a generation timeframe of 14 days."},
        {k:"B", t:"Define a generation horizon of 14 days."},
        {k:"C", t:"Configure Auto-generate Work Orders to True."},
        {k:"D", t:"Define a generation horizon of 20,160 minutes."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Maintenance Plan object has a dedicated field for exactly this: Generation Horizon (labeled "Generation Horizon (Days)" and documented as an Integer field). Salesforce's own field reference defines it as "moves up the timing of batch generation if [Auto-generate work orders] is set to true — a generation horizon of 5 means the new batch of work orders is generated 5 days before the maintenance asset's Next Suggested Maintenance Date." Setting Generation Horizon to 14 does precisely what's asked: it creates the Work Order batch 14 days ahead of the next suggested maintenance date.

**Why A is wrong.** Generation Timeframe is a different field that controls how far into the future a single batch of Work Orders covers (for example, set it to 6 with a Generation Timeframe Type of Months to generate six months' worth of future Work Orders in one batch). It has nothing to do with how many days before the suggested date a Work Order is created — that's Generation Horizon's role, not Generation Timeframe's.

**Why C is wrong.** Auto-generate Work Orders is a boolean switch that turns on automatic batch generation (and blocks manual generation). It's a prerequisite for Generation Horizon to take effect, but flipping it on by itself doesn't specify a lead time — it answers "automatic or manual," not "how many days before."

**Why D is wrong.** 20,160 minutes is mathematically equal to 14 days, but Generation Horizon is documented and labeled specifically as "Generation Horizon (Days)" — an integer counted in days, not minutes. There's no minutes-based unit for this field, so this option is a unit-conversion distractor with no basis in the actual field definition.`,
      sources:[
        {l:"MaintenancePlan — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_maintenanceplan.htm"},
        {l:"Maintenance Plan Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_maintenance_fields.htm&language=en_US&type=5"},
        {l:"Guidelines for Generating Work Orders from a Maintenance Plan — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_generate_work_orders_plan.htm&type=5"}
      ]
    },
    {
      topic:"Contractor Licensing",
      select:1,
      prompt:"A Company plans to deploy field service lightning to 100 external contractors. There are 75 contractors who need access to Work Orders, Assets, Mobile App, and Chatter. The remaining 25 contractors are paid a commission on sales of containers and need to schedule resources. Which license types and quantities should the consultant recommend?",
      options:[
        {k:"A", t:"100 Contractors"},
        {k:"B", t:"100 Contractor (Full Access) Licenses"},
        {k:"C", t:"25 Contractor (Full Access) Licenses and 75 Contractor (Limited Access) Licenses"},
        {k:"D", t:"75 Contractor (Full Access) licenses and 25 Contractor (Limited Access) licenses"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Field Service contractor licensing comes in two tiers, and each maps to a different underlying Experience Cloud license. Salesforce's own setup documentation states it directly: "each unit of the Contractor Login-Based SKU assigns 20 Customer Community Plus login-based licenses and each unit of the Contractor Plus Login-Based SKU assigns 20 Partner Community login-based licenses." The base Contractor ("Limited Access") tier, paired with the Field Service Mobile and Field Service Scheduling permission set licenses, covers exactly the 75 contractors' needs — Work Orders, Assets, the mobile app, and Chatter. The Contractor Plus ("Full Access") tier, built on Partner Community, is documented as ideal for "users who are engaged in sales or distribution" — a direct match for the 25 contractors earning commission on container sales — and it's also the tier required for dispatching: Salesforce's Field Service Permission Set License reference lists "Field Service Dispatcher Plus Login-Based" as being specifically "for contractor dispatchers with Contractor Plus licenses," which is what "need to schedule resources" requires. So: 25 Full Access, 75 Limited Access.

**Why A is wrong.** Treating all 100 as an undifferentiated "Contractors" license ignores that the 25 sales/scheduling contractors need capabilities — dispatching and Partner-based sales access — that the base Contractor license doesn't include.

**Why B is wrong.** Giving all 100 the Full Access (Contractor Plus) tier would functionally work, but it isn't the right recommendation — it means paying for Partner Community-based Full Access licenses for 75 users who only need basic Work Order/Asset/mobile/Chatter access, which the cheaper Limited Access tier fully covers.

**Why D is wrong.** This inverts the requirement, assigning Full Access to the 75 basic-access contractors and Limited Access to the 25 who actually need the scheduling and sales-oriented capabilities — backwards from where the extra access is genuinely needed.`,
      sources:[
        {l:"Guidelines for Setting Up Field Service Contractors — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_setting_up_contractors.htm&type=5"},
        {l:"Give Contractor Service Resources Access to the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_contractor_access.htm&language=en_US&type=5"},
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A company wants its technician to follow a standard operation procedure (SOP) while performing maintenance on an individual Asset. Each operation should be captured independently to allow technician to enter note and update status as they progress with the work. Preventative maintenance should be with a single visit. Which data model should the consultant recommend to the company?",
      options:[
        {k:"A", t:"Service Appointment to represent the preventative maintenance on the Asset - Work Order Line Item to represent the different operations - Work Order to represent the visit"},
        {k:"B", t:"Work Order to represent the preventative maintenance on the Asset - Work Order Line Item to represent the different operations - Service Appointment to represent the visit"},
        {k:"C", t:"Work Order to represent the preventative maintenance on the Asset - Service Appointment to represent the different operations - Work Order Lien Item to represent the visit"},
        {k:"D", t:"Work Order Line Item to represent the preventative maintenance on the Asset - Work Order to represent the different operations - Service Appointment to represent visit"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** This maps cleanly onto Salesforce's core Field Service hierarchy. A Work Order is documented as "a request for field service work" tied to an Asset — that's the preventative maintenance job itself. Salesforce adds that "a work order can include several work order line items representing different types of work that must be done" — exactly the SOP's individual operations. Critically, the WorkOrderLineItem object carries its own independent Status field ("New, In Progress, On Hold, Completed, Cannot Complete, Closed, Canceled") and its own Description field ("describe the steps needed to mark the line item Completed"), satisfying "enter note and update status" per operation rather than at the whole-job level. Finally, a Service Appointment is documented as providing "the scheduling and assignment details of a field service visit" — the single visit the maintenance is completed in.

**Why A is wrong.** It swaps Work Order and Service Appointment's roles — a Work Order is the job/request itself, not the visit, and a Service Appointment is the scheduling/visit record, not the overarching maintenance job.

**Why C is wrong.** It puts the individual operations on Service Appointment and the visit on Work Order Line Item. Service Appointments are scheduling records, not per-task note/status trackers, and a Work Order Line Item is a subtask — it can't represent a schedulable visit.

**Why D is wrong.** It assigns the whole maintenance job to a Work Order Line Item (a subtask can't represent its own parent job) and the individual operations to Work Order (the parent record, not the per-task granularity the SOP needs) — the hierarchy is inverted end to end.`,
      sources:[
        {l:"Field Service Key Concepts and Glossary — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_key_concepts.htm&language=en_US&type=5"},
        {l:"WorkOrderLineItem — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderlineitem.htm"},
        {l:"Core Data Model | Field Service and Operations — Salesforce Developers", u:"https://developer.salesforce.com/docs/platform/data-models/guide/field-service-core-data-model.html"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A mobile technician uses parts present in their van to complete an on-site customer installation. The technician has marked the Service Appointment and the Work Order as completed. They want to record the parts used in completing the job and adjust their van stock. Where should the technician record this information?",
      options:[
        {k:"A", t:"The Work Order Line Item associated with the completed Work Order"},
        {k:"B", t:"The Products Consumed section on the Work Order"},
        {k:"C", t:"The Product Item Transactions Related List on the Product Item"},
        {k:"D", t:"The Product Request Line Item associated with the Product"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce's Field Service Developer Guide defines the ProductConsumed object as representing "an item from your inventory that was used to complete a work order or work order line item," and states directly that "creating a product consumed record subtracts the quantity consumed from the linked product item's quantity." That's exactly what's needed here: logging which parts were used on the completed job, and automatically adjusting the van's stock (the Product Item) downward. The Products Consumed related list on the Work Order is the purpose-built entry point for that.

**Why A is wrong.** A Work Order Line Item represents a subtask or operation of the job — it isn't itself a record of which physical parts were consumed. Products Consumed can optionally be tied to a specific Work Order Line Item, but the parts-used entry happens in the Products Consumed record, not the WOLI record itself.

**Why C is wrong.** Product Item Transaction is explicitly documented as auto-generated, not something a technician creates directly: "a Consumed transaction generates when records are added to Products Consumed lists on work orders." It's the automatic audit trail produced by logging Products Consumed, not the place to take the action.

**Why D is wrong.** A Product Request Line Item belongs to the Product Request object, used to request that parts be transferred to a technician — for example, replenishing van stock ahead of a job. That's about acquiring inventory, not recording what was consumed after the work is done.`,
      sources:[
        {l:"ProductConsumed — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productconsumed.htm"},
        {l:"ProductItemTransaction — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productitemtransaction.htm"}
      ]
    },
    {
      topic:"Dispatch & Reassignment",
      select:1,
      prompt:"A Dispatcher at A Company has just informed that one of their field employees, who has five schedules for today, called in sick. How should the work load be assigned to other Field Technicians?",
      options:[
        {k:"A", t:"Drag and drop the Service Appointments to other available Resources and run Optimization."},
        {k:"B", t:"Ask the Customer Service Rep to call the customers and manually re-schedule for another day."},
        {k:"C", t:"Update the Resource as not available, select the affected Service Appointments, and press \"Schedule\"."},
        {k:"D", t:"Change the Scheduling Policy to \"High Intensity\" and activate the Background Optimization process."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce models a technician calling in sick with a Resource Absence — the documented absence types are "Vacation, Meeting, Training, or Medical," with Medical being the natural fit here. Once the absence exists, Salesforce's own documentation confirms "During schedule optimization, service resources aren't assigned to appointments that conflict with their absences," correctly removing the sick technician from future consideration. For the five appointments already sitting on that technician's schedule, Salesforce's Dispatcher Console training is explicit that the Schedule action is the right tool: "The appointment is automatically scheduled to a mobile worker with the correct skills and availability" — letting the system find qualified, available replacements for all five at once, respecting skills, territory, and travel time.

**Why A is wrong.** Manual drag-and-drop is exactly what Salesforce's own training warns can create rule violations: "If you schedule an appointment using the Schedule or Candidates actions, you won't see any rule violations. But if you do manual scheduling, like dragging an appointment into a blank space on the Gantt, they can happen." Doing this one appointment at a time is also slower than letting the Schedule action handle all five, and it never actually marks the sick technician unavailable.

**Why B is wrong.** Pushing the work to another day abandons appointments other technicians could absorb today — it ignores the system's actual purpose of matching qualified, available resources to open work instead of inconveniencing the customer.

**Why D is wrong.** Changing the org-wide Scheduling Policy to "High Intensity" and turning on background optimization is a broad, permanent configuration change — it doesn't target reassigning today's five specific appointments at all.`,
      sources:[
        {l:"Create Service Resource Absences for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5"},
        {l:"Manage Service Appointments — Field Service Dispatcher Console for Dispatchers (Trailhead)", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A technician needs to get replacement part for damaged inventory on them for an upcoming job. To which object should the technician add a product request record?",
      options:[
        {k:"A", t:"Service Report"},
        {k:"B", t:"Service Appointment"},
        {k:"C", t:"Work Order"},
        {k:"D", t:"Work Types"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's Field Service documentation is explicit about which records support a Product Request: "Product requests can be associated with work orders, work order line items, cases, and accounts," with creation happening "from the Product Requests tab or the Product Requests related list on a work order or work order line item." It even describes this exact scenario: "Mobile workers can create product requests when they find defective parts in their vehicles" — and that request gets logged against the Work Order tied to their upcoming job. The ProductRequest object reference backs this up structurally too, with dedicated lookup fields AccountId, CaseId, WorkOrderId, and WorkOrderLineItemId — no equivalent field exists for a Service Appointment, Service Report, or Work Type.

**Why A is wrong.** A Service Report is a generated summary document created to describe completed work — it's an output artifact, not an object with a Product Requests related list or parent-record lookup for part requests.

**Why B is wrong.** Service Appointment represents the scheduling/visit details for the job, but it isn't a documented parent object for Product Request — there's no ServiceAppointmentId field on ProductRequest.

**Why D is wrong.** Work Types are templates defining default settings (duration, skills, line items) for work orders generated from them — they're not instance records tied to a specific technician's specific upcoming job, so there's nothing there to attach an individual part request to.`,
      sources:[
        {l:"Request Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_part_requests.htm&language=en_US&type=5"},
        {l:"ProductRequest — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productrequest.htm"}
      ]
    },
    {
      topic:"Work Order Lifecycle",
      select:2,
      prompt:"A Company has a large volume of cancellations occurring on their Work Orders. The COO wants to manage Work Order cancellations and subsequent follow-ups. Which two options should a Consultant recommend? Choose 2 answers",
      options:[
        {k:"A", t:"Change the Work Order with a closed Status of \"Cancelled.\""},
        {k:"B", t:"Create a child Work Order for the follow-up Work Order."},
        {k:"C", t:"Re-use the existing Work Order for the follow-up."},
        {k:"D", t:"Change the Work Order with a status of \"New\"."}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Salesforce's own Guidelines for Creating Work Orders states this directly: "When work is canceled, you can set the work order status to Canceled and create a child work order." It even explains why: "This lets you track first-time rates and analyze cancellation reasons." Closing the original Work Order out with the Canceled status (a documented end-state value — "Canceled—Work is canceled, typically before any work began") while spinning up a standalone child Work Order for the follow-up — since "Work orders can have child work orders, which are standalone records that can be scheduled, given statuses, and assigned" — preserves a clean, reportable record of both the cancellation and the redo.

**Why C is wrong.** Reusing the same Work Order for the follow-up collapses the canceled attempt and the new attempt into a single record, destroying the reporting benefit Salesforce calls out — there's no longer a distinct canceled record to count toward first-time completion rates or cancellation-reason analysis.

**Why D is wrong.** Resetting the Work Order's status back to "New" to reuse it has the same flaw as C — it erases the fact that a cancellation happened at all, rather than preserving it as a closed record while a fresh child Work Order carries the follow-up.`,
      sources:[
        {l:"Guidelines for Creating Work Orders for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_work_order_guidelines.htm&type=5"},
        {l:"WorkOrderStatus — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderstatus.htm"}
      ]
    },
    {
      topic:"Customer Communication",
      select:2,
      prompt:"A Company wants to improve customer satisfaction around upcoming appointments. When designing the Customer Service Representative's user interface, most cases, which two fields should be shared with the customer about an upcoming appointment? Choose 2 answers",
      options:[
        {k:"A", t:"Arrival Window Start"},
        {k:"B", t:"Arrival Window End"},
        {k:"C", t:"Scheduled Start"},
        {k:"D", t:"Scheduled End"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Salesforce's Service Appointment Fields documentation says it plainly: "You may choose to share the Arrival Window Start and End with the customer, but keep the Scheduled Start and End internal-only." Arrival Window Start/End are defined as "the beginning/end of the window of time in which the mobile worker is scheduled to arrive at the site" — a deliberately broader range built to absorb normal schedule slippage (an earlier job running long, traffic, etc.), so it's a promise the company can reliably keep. That's exactly what protects customer satisfaction: an honest, achievable expectation instead of a fragile precise one.

**Why C and D are wrong.** Scheduled Start and Scheduled End are documented as internal values — "the time at which the appointment is scheduled to start/end" — used by dispatchers and the optimizer for precise resource allocation and sequencing. They shift constantly as the day's schedule gets re-optimized, so showing a customer that exact time invites a broken promise the moment an earlier appointment runs over. Salesforce's own guidance recommends keeping these internal-only rather than customer-facing.`,
      sources:[
        {l:"Service Appointment Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_appointment_fields.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_appointment_guidelines.htm&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A Company has hired a contractor to help with service calls on an as-needed basis. The contractor should be limited to travel a maximum of 50 minutes from home. Which action should a consultant recommend?",
      options:[
        {k:"A", t:"Link rules to Relevance Groups."},
        {k:"B", t:"Include a Match Fields Work Rule."},
        {k:"C", t:"Assign a high efficiency score."},
        {k:"D", t:"Check 'Keep These Appointments Scheduled'."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce Field Service has a purpose-built work rule for this — Maximum Travel From Home — but the piece this question tests is how to make that cap apply only to this one as-needed contractor, without affecting the rest of the workforce's scheduling. That's exactly what Relevance Groups do: Salesforce describes them as "a way to apply certain Work Rules and Objectives within a Scheduling Policy to certain groups of Service Resources and/or a certain group of Service Appointments, through the use of Boolean Fields." A documented real-world setup for this exact scenario creates a Maximum Travel From Home work rule, then links it to a Relevance Group so it's "only applicable for the Service Resource for which [a Boolean flag like] 'Contractor' is true" — leaving full-time employees' scheduling untouched.

**Why B is wrong.** The Match Fields work rule type "matches a service appointment field with a service resource field" — a direct field-to-field comparison for enforcing custom-field requirements. Salesforce's own documentation notes travel-related constraints use a separate rule type (Maximum Travel From Home), not Match Fields.

**Why C is wrong.** Efficiency-related settings are Service Objectives — score-based preferences that influence which schedule the optimizer favors — not Work Rules, which perform hard yes/no elimination. A strict 50-minute cap is a hard requirement needing a rule, not a soft scoring preference a high efficiency weighting would provide.

**Why D is wrong.** "Keep These Appointments Scheduled" is an optimization-run option that prevents already-scheduled appointments from being moved — it has nothing to do with limiting how far a resource can travel from home.`,
      sources:[
        {l:"De-mystifying Salesforce Field Service Relevance Groups — Thunder", u:"https://thundersf.com/de-mystifying-salesforce-field-service-relevance-groups/"},
        {l:"Salesforce Field Service Scheduling — Prefer Contractor over FTE if Contractor home base is less than X miles from the Job location", u:"https://medium.com/@sharmarajat1984/salesforce-field-service-scheduling-prefer-contractor-over-fte-if-contractor-home-base-is-less-a471a2ea822"},
        {l:"Work Rule Type: Match Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_match_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:3,
      prompt:"A Company wants to track Technicians' van stock using the Salesforce Field Service Mobile App and ensure that Technicians report when parts are used. Which three data elements should a Consultant recommend tracking to support these requirements? Choose 3 answers",
      options:[
        {k:"A", t:"Products Required"},
        {k:"B", t:"Products Consumed"},
        {k:"C", t:"Warehouse Locations"},
        {k:"D", t:"Inventory"}
      ],
      correct:["A","B","D"],
      explanation:
`**Why A, B, and D are right.** Together these three cover the full loop a mobile-app-based van stock process needs: what a job requires, what's actually on hand, and what got used. Products Required lists what a technician needs to bring for a given job — the checklist that gets checked against van stock before and during the visit. Inventory (Product Item records) tracks the real, current quantity of each product at the technician's van location — "Product items list a quantity at the location that is updated automatically when inventory is transferred or consumed." And Products Consumed is exactly what "report when parts are used" calls for: "When a product is consumed during the completion of a work order, track its consumption by creating a product consumed record," which automatically decrements the linked Product Item, keeping the van's tracked stock accurate after every job.

**Why C is wrong.** A technician's van isn't modeled as a Warehouse in Salesforce's data model — it's a Mobile Location. The Location object's IsMobile field is described with exactly this example: "Indicates whether the location moves. For example, a truck or tool box." Salesforce's own documentation even separates the two in the same breath: "Service territory locations are warehouses, customer sites, or vehicles" — treating warehouses and vehicles as distinct categories, not one covering the other. So "Warehouse Locations" is the wrong location concept for tracking a van's stock.`,
      sources:[
        {l:"Field Service Inventory Management Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm"},
        {l:"Location — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_location.htm"},
        {l:"Create Inventory Locations for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_locations.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Status Transitions & Pinning",
      select:2,
      prompt:"Service Appointments in a \"Cannot Complete\" Status may indicate that an additional part or expert assistance is needed to complete the work. A Company defined that Service Appointments in a \"Cannot Complete\" Status are unable to be rescheduled or unscheduled for history tracking purposes. Which two items should the consultant recommend to meet the requirement? Choose 2 answers",
      options:[
        {k:"A", t:"Define \"Cannot Compete\" as a pinned Status for auto-dispatch services."},
        {k:"B", t:"Ensure that Status Transitions are configured to allow the Status update from \"Cannot Complete\" to \"Scheduled\"."},
        {k:"C", t:"Define \"Cannot Complete\" as a pinned Status for Scheduling and Optimization services."},
        {k:"D", t:"Ensure that Status Transitions are configured to prevent the update from \"Cannot Complete\" to \"None\"."}
      ],
      correct:["C","D"],
      explanation:
`**Why C and D are right.** The requirement has two halves — "unable to be rescheduled" and "unable to be unscheduled" — and each maps to a different Field Service mechanism. Unscheduling a Service Appointment is documented as a specific transition to the "None" status: "Unschedule simply moves the status back to 'None' and removes the assigned resource." So blocking the transition from "Cannot Complete" to "None" via Status Transitions is exactly what prevents unscheduling — that's D. For "rescheduled," Salesforce's pinned-status mechanism is what stops automated scheduling engines from moving an appointment: "'Pinned Status' is a configurable setting that marks certain Service Appointment statuses... as pinned," and once pinned, "automated scheduling actions... will NOT move or reschedule the appointment." The services that could actually attempt to reschedule an already-attempted appointment are the Scheduling and Optimization engines (Get Candidates, Book Appointment, Optimization) — so pinning "Cannot Complete" against those is C.

**Why A is wrong.** Auto-Dispatch handles automatically assigning new, queued, unscheduled work to available resources — it isn't the mechanism that would revisit and move an appointment that's already been attempted and marked Cannot Complete. Pinning against auto-dispatch doesn't address the actual risk here.

**Why B is wrong.** This does the opposite of what's needed — explicitly allowing the transition from "Cannot Complete" to "Scheduled" would enable rescheduling, directly contradicting the stated requirement that these appointments must not be reschedulable.`,
      sources:[
        {l:"Service Appointment with pinned Status can be manually rescheduled — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000393228&language=en_US&type=1"},
        {l:"Field Service Lightning: Understanding Status Transitions and Pinned Status for Service Appointments — ForceTree", u:"https://www.forcetree.com/2018/04/field-service-lightning-understanding.html"}
      ]
    },
    {
      topic:"Sharing & Territories",
      select:2,
      prompt:"A Consultant has implemented User Territories at A Company in a private sharing model. A new Midwest Service Territory has been created. Which two actions should A Company take to give the dispatcher access to all relevant Midwest records? Choose 2 answers",
      options:[
        {k:"A", t:"Create a new User Territory associated with the Service Territory and Dispatcher."},
        {k:"B", t:"Add the Resources assigned to the Service Territory's Member related list."},
        {k:"C", t:"Configure and run the User Territory Sharing Job in Field Service Settings."},
        {k:"D", t:"Assign a new User Territory and add each of the Assigned Services Resources."}
      ],
      correct:["A","C"],
      explanation:
`**Why A and C are right.** Salesforce's Field Service documentation states this mechanism directly: "service resources and service appointments associated with a service territory are shared with dispatchers responsible for managing that service territory. This sharing functionality is achieved through the use of public groups, User Territory records, and the user territory scheduled job." Setting it up means, first, creating the User Territory record: "From the App Launcher, find and open User Territories. Click New. Select a service territory. Select the user you want to add" — tying the Midwest Service Territory to the dispatcher (A). Second, configuring and running the scheduled sharing job (under Field Service Settings > Sharing > Scheduled Jobs, with settings like Time Horizon and Frequency) is what actually evaluates territory membership and grants the access (C) — without running it, the User Territory record alone won't propagate sharing.

**Why B is wrong.** Salesforce's documentation is explicit: "You do not need a separate step to manually assign Service Resources to territories — the User Territory record itself grants the dispatcher access to all records associated with that territory." Adding resources to the Service Territory Member related list is a staffing/data-model step, not what the dispatcher's sharing access depends on.

**Why D is wrong.** This assigns a User Territory to Service Resources rather than to the dispatcher — but resource membership isn't what needs a User Territory record for sharing purposes. It's the dispatcher, who doesn't own the underlying records and needs visibility into them, who must be added to the User Territory.`,
      sources:[
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"},
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/apex/HTViewHelpDoc?id=sf.fs_sharing.htm&language=en_US"}
      ]
    },
    {
      topic:"Preventive Maintenance",
      select:1,
      prompt:"One of the products sold by A Company requires quarterly Service Appointments. Which feature should a Consultant use to meet this requirement?",
      options:[
        {k:"A", t:"Define a repeating Work Type."},
        {k:"B", t:"Implement Path for Work Orders."},
        {k:"C", t:"Build a Process for Service Appointments."},
        {k:"D", t:"Configure a Maintenance Plan."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own Trailhead content defines this exact use case: a Maintenance Plan lets you "define the maintenance schedule for one or more assets and generate multiple work orders for future maintenance visits," with configurable Frequency and Recurrence Period fields (e.g., every 3 months for a quarterly cadence) that automatically generate the recurring Work Orders and their Service Appointments rather than someone creating each one by hand.

**Why A is wrong.** There's no "repeating Work Type" feature — Work Types are templates that define job attributes (duration, required skills, line items) for a single Work Order. Trailhead's own description confirms recurring generation is a Maintenance Plan feature specifically, not something Work Types do on their own.

**Why B is wrong.** Path is a UI feature that visually guides users through picklist-based stages on a record (like Work Order status progression) — it's a presentation/guidance tool, not a scheduling or recurrence mechanism.

**Why C is wrong.** A custom Process (Process Builder/Flow) could theoretically be hand-built to generate appointments on a schedule, but that reinvents a wheel Salesforce already ships — Maintenance Plans are the purpose-built, declarative feature for exactly this recurring-service scenario.`,
      sources:[
        {l:"Creating Effective Maintenance Plans for Assets — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_plan"}
      ]
    },
    {
      topic:"Preventive Maintenance",
      select:2,
      prompt:"A Company requires a trained inspectors to make 3 site per year to inspect the container customer's sites. These visits must be scheduled within 14 days of inspection due date. What are two ways a Consultant can configure maintenance plans to meet the requirements? Choose 2 answers",
      options:[
        {k:"A", t:"Associate Work Type called Site to Maintenance Plan"},
        {k:"B", t:"Auto generate Work Order with a 14 days generation horizon"},
        {k:"C", t:"Auto generate Work Order with 14-day generation time frame"},
        {k:"D", t:"Associate a required skill call Site Visits to maintain plans."}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Salesforce's SkillRequirement object only supports attaching skills to "work types, work orders, and work order line items" — Maintenance Plan isn't a valid parent for a skill requirement. So to make sure only trained inspectors get matched to these visits, the requirement has to flow through a Work Type: the Maintenance Plan's Work Type field "specifies the associated work type and inherited properties for generated work orders," so associating a Work Type (like "Site") that itself carries the required skill means every generated Work Order inherits it automatically (A). For the 14-day scheduling window, that's exactly what Generation Horizon does: "the next batch of work orders is generated this number of days before the maintenance plan's Date of the first work order in the next batch." Setting it to 14 creates the Work Order (and Service Appointment) 14 days ahead of the due date, giving the dispatcher the lead time actually needed to schedule the visit in time (B).

**Why C is wrong.** Generation Timeframe is a different field — it controls how far into the future a single batch of Work Orders covers (e.g., a full year's worth of visits generated in one batch), not how many days before the due date a Work Order is created. It doesn't produce the "scheduled within 14 days of the due date" lead time this requirement needs.

**Why D is wrong.** As above, Maintenance Plan isn't a supported parent object for a Skill Requirement — skills attach to the Work Type (or a Work Order/Work Order Line Item), not directly to the plan. Associating the Work Type (A) is the correct way to get that skill requirement onto the generated visits.`,
      sources:[
        {l:"SkillRequirement — Object Reference for the Salesforce Platform", u:"https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_skillrequirement.htm"},
        {l:"Maintenance Plan Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_maintenance_fields.htm&language=en_US&type=5"},
        {l:"Guidelines for Generating Work Orders from a Maintenance Plan — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_generate_work_orders_plan.htm&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:2,
      prompt:"A Company performs Service on Field Assets that require a sequence of Work Tasks. A Consultant has recommended Work Order Line Items to manage the tasks and Assets/Parts necessary to manage the work. Which two of the following must be considered as part of this solution to ensure Work Orders are properly completed. Choose 2 answers",
      options:[
        {k:"A", t:"Use of a parent-child Work Order Line Item to create a Work Order Line Item hierarchy."},
        {k:"B", t:"Use of Standard Reports to view Parent and Root Work Order Line Items within Work Orders by Customer."},
        {k:"C", t:"Use of Work Order Line Items to link to a specific Asset within the Asset Hierarchy that represents the BoM."},
        {k:"D", t:"Use of Work Order Line Items that automatically inherit the hierarchy of Assets attached to Work Order"}
      ],
      correct:["A","C"],
      explanation:
`**Why A and C are right.** The scenario has two distinct needs — managing a sequence of Work Tasks, and managing the Assets/Parts involved — and each maps to a different Work Order Line Item capability. For the task sequence, Work Order Line Item supports a self-referencing hierarchy: ParentWorkOrderLineItemId is "the line item's parent work order line item, if it has one," letting you model a multi-step sequence as parent/child line items (A). For the assets/parts side, line items link to a specific AssetId — and since Assets support a hierarchical structure, deliberately linking line items to the right level of that Asset Hierarchy is how you represent a Bill of Materials within the work (C).

**Why D is wrong.** This is directly contradicted by Salesforce's own field documentation: the AssetId field description states plainly, "The asset is not automatically inherited from the parent work order." There's no automatic mirroring of an Asset's hierarchy onto Work Order Line Items — each line item's Asset link has to be set deliberately, which is exactly why C is a real consideration and D's claim of automatic inheritance is false.

**Why B is wrong.** A RootWorkOrderLineItemId field genuinely exists ("the top-level line item in a work order line item hierarchy"), but reporting on it is a visibility/analysis feature, not something that affects whether the actual work gets properly completed. The question asks what must be considered to ensure Work Orders are properly completed — that's about how the tasks and assets are structured and linked, not about how they're later reported on.`,
      sources:[
        {l:"WorkOrderLineItem — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderlineitem.htm"}
      ]
    },
    {
      topic:"Work Orders & Appointments",
      select:1,
      prompt:"A Technician at A Company is responsible for servicing multiple Assets at a customer site during a single visit. A Company wants to minimize impact for the customer and consolidate work for its Technician. What should the Consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Create a single Work Order with Work Order Line Items for each Asset, each with a Service Appointment."},
        {k:"B", t:"Create and schedule a Service Appointment with a single Work Order with Work Order Line Items for each Asset."},
        {k:"C", t:"Create and schedule independent Work Orders for each Asset, each with a Service Appointment."},
        {k:"D", t:"Create designated Time Slots to ensure appropriate time is held to accommodate these types of visits."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Service Appointment is the unit that represents one scheduled visit — one resource, one time window, one status. To consolidate all the Asset servicing into a single visit, the right structure is one Work Order covering the site visit, a Work Order Line Item for each individual Asset (so each Asset's work is still tracked and completed independently within that visit), and just one Service Appointment scheduled against that Work Order to represent the single trip.

**Why A is wrong.** Giving each Line Item its own Service Appointment means each Asset gets its own separately scheduled visit — multiple appointments, multiple potential trips — which works directly against "a single visit" and minimizing customer impact.

**Why C is wrong.** Independent Work Orders per Asset, each with its own Service Appointment, is the most fragmented option of all — it explicitly creates separate visits per Asset rather than consolidating anything.

**Why D is wrong.** Time Slots control customer-facing booking windows available for scheduling (tied to Operating Hours) — they don't change how Work Orders, Line Items, or Service Appointments are structured, and they don't consolidate multiple Assets' service into a single visit on their own.

This is effectively the mirror image of Ticket #13 in this deck ("three containers... handled independently"), where the goal was the opposite — keeping each Asset's service independent, which needed a separate Service Appointment per Asset. Here, with the goal flipped to consolidation, the correct structure flips accordingly to a single Work Order, per-Asset Line Items, and one shared Service Appointment.`,
      sources:[
        {l:"Guidelines for Creating Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_appointment_guidelines.htm&type=5"}
      ]
    },
    {
      topic:"Sharing & Territories",
      select:2,
      prompt:"A Company has implemented Field Service using a private access model. A Company has also set Work Types to automatically generate Service Appointments. Which two sharing options are available for these Service Appointments? Choose 2 answers",
      options:[
        {k:"A", t:"A Service Appointment can be shared by clicking Sharing on the record."},
        {k:"B", t:"The Service Appointment's parent record can be shared with the Assigned Resource."},
        {k:"C", t:"Make the dispatcher the Assigned Resource on the Service Appointments."},
        {k:"D", t:"Auto-generated scheduled Service Appointments will be shared with resources."}
      ],
      correct:["B","D"],
      explanation:
`**Why B and D are right.** Field Service ships with Work Order, Work Order Line Item, and Service Appointment set to Public Read/Write org-wide defaults; switching to a private access model means these must be locked down to Private, and Salesforce's own "Limiting Access to Field Service Records" documentation lists exactly two dedicated Field Service Settings checkboxes (under Field Service Settings → Sharing) to restore the access dispatchers and technicians actually need: "Share dispatched service appointments with their assigned resources" and "Share service appointments' parent work orders with their assigned resources." D is the first of these — once an auto-generated Service Appointment is scheduled/dispatched, this setting automatically shares it with its Assigned Resource. B is the second — the Service Appointment's parent Work Order gets shared with the Assigned Resource as well, so the technician can see the full job context, not just the appointment.

**Why A is wrong.** A generic "Sharing" button exists on most private-model Salesforce records, but it isn't one of the two purpose-built options Salesforce documents for this exact scenario, and it doesn't scale to appointments a Work Type is generating automatically in bulk — there's no realistic manual per-record click workflow for system-generated records.

**Why C is wrong.** Making the dispatcher the Assigned Resource isn't a sharing mechanism at all — it conflates the dispatcher's role with the technician's, and would corrupt reporting on who actually performed the work. It's a data-integrity anti-pattern, not a recommended way to grant access.`,
      sources:[
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_sharing.htm&language=en_US&type=5"},
        {l:"Create Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_appointments.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:1,
      prompt:"A Company wants Technicians using the Salesforce Field Service Mobile App to indicate when Service Appointments are at risk of late completion. What should a Consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Post to the Service Appointment Chatter feed."},
        {k:"B", t:"Change the Status field on the Service Appointment."},
        {k:"C", t:"Adjust the Scheduled End field on the Service Appointment."},
        {k:"D", t:"Update the In Jeopardy field on the Service Appointment."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Field Service ships with a purpose-built field on Service Appointment for exactly this signal — the boolean In Jeopardy field (FSL__InJeopardy__c), whose own field description says it "determines if a service appointment is in jeopardy" and "helps dispatchers gain visibility to service appointments at risk." There's a companion In Jeopardy Reason picklist (values like Delayed Start, Delayed Finish, Due Date Approaching) for capturing why. A Consultant can expose this field on the mobile app's page layout or a custom action so a technician who realizes they're running behind can flip it, immediately giving dispatchers the "at risk of late completion" visibility the company wants — which is precisely the field's documented purpose.

**Why A is wrong.** A Chatter post is informal and easy to miss — it doesn't create a queryable, reportable, or dashboard-able flag the way a dedicated field does, so dispatchers have no reliable way to systematically surface at-risk appointments across the whole schedule.

**Why B is wrong.** The Status field tracks the appointment's actual lifecycle stage (e.g., Scheduled, Dispatched, In Progress, Completed, Cannot Complete). Being "at risk of running late" isn't a lifecycle stage — the appointment is still legitimately in progress — so overloading Status to also mean "at risk" would corrupt lifecycle reporting and status-transition automation built around the real workflow.

**Why C is wrong.** Scheduled Start/End represent the planned internal schedule set by dispatching/optimization, not a technician-facing risk signal. Having a technician edit Scheduled End directly changes planning data (and could conflict with optimization or arrival-window commitments) rather than simply flagging that the appointment is at risk — it's the wrong tool for communicating a warning.`,
      sources:[
        {l:"ServiceAppointment Custom Fields — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_custom_fields_object_serviceappointment.htm"},
        {l:"Manage Service Appointments — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"How should a Consultant configure Salesforce Field Service to ensure agents and dispatchers can quickly create Work Orders with the appropriate materials?",
      options:[
        {k:"A", t:"Create Work Types with Work Order Line Items."},
        {k:"B", t:"Create Work Types and Locations."},
        {k:"C", t:"Create Work Types with Products Consumed."},
        {k:"D", t:"Create Work Types with Products Required."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** A Work Type is a reusable template for a common job — Salesforce describes it as letting agents "create work orders from work type templates" for the jobs their mobile workforce performs repeatedly. Products Required is the pre-job-planning list of parts/materials a job needs, and Salesforce's own Field Service training walks through associating a Products Required item with a Work Type (e.g., linking a "Cable (100 ft)" product to a "Cable Install" Work Type) specifically so that when an agent or dispatcher creates a Work Order from that template, the correct materials are already listed — no manual entry required each time. That's exactly the "quickly create Work Orders with the appropriate materials" outcome the question asks for.

**Why A is wrong.** Work Order Line Items represent the individual tasks/sub-jobs on a Work Order once it exists — they don't carry a materials list that pre-populates when the Work Order is created, so they don't speed up getting the right parts onto a new Work Order.

**Why B is wrong.** Locations represent physical places (warehouses, vans, sites) in the inventory model — they're about where stock lives, not about templating what materials a given job type needs. Pairing Work Types with Locations doesn't give agents a pre-built materials list when creating a Work Order.

**Why C is wrong.** Products Consumed is a record of parts actually used, created after the work is performed (and it auto-decrements Product Item inventory) — it's a usage/reporting artifact, not a pre-job planning list. It doesn't exist yet when a new Work Order is being created, so it can't speed up choosing the right materials at creation time; that job belongs to Products Required.`,
      sources:[
        {l:"Creating Work Types for Field Service in Salesforce — Trailhead", u:"https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:1,
      prompt:"A Company wants to provide a view of emergency work that is only visible to dispatchers. What should the consultant do to meet the requirement?",
      options:[
        {k:"A", t:"Custom List View"},
        {k:"B", t:"Custom Report in a private report folder"},
        {k:"C", t:"Custom Gantt filter"},
        {k:"D", t:"Custom Lightning Component"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Custom filters in the Field Service Dispatcher Console's Gantt/appointment list can be created as private and then deliberately shared only with the audience that needs them. Salesforce's own setup documentation gives almost exactly this scenario as its worked example: "if only San Francisco dispatchers need access to the 'Bay Area Emergency Work' custom filter, create a private custom filter. Then, share 'Bay Area Emergency Work' with the San Francisco public group using standard sharing." That's precisely the pattern needed here — build a custom Gantt filter for emergency work, keep it private, and share it with a public group containing just the dispatchers, so no one else sees it.

**Why A is wrong.** A standard Salesforce List View operates on the Service Appointment/Work Order list pages, not inside the dispatcher-oriented Gantt workspace where scheduling decisions actually happen, and restricting it to dispatchers only would require separate, clunkier visibility workarounds rather than using the sharing model Field Service already built for exactly this filter use case.

**Why B is wrong.** A private report folder is a reporting/analysis tool for after-the-fact visibility, not an operational, real-time scheduling view — it wouldn't give dispatchers a live, actionable Gantt-integrated view of emergency work they can act on while dispatching.

**Why D is wrong.** Building a custom Lightning Component is unnecessary custom development effort when the Dispatcher Console's built-in custom-filter-plus-sharing mechanism already solves this exact requirement out of the box — a Consultant should reach for the declarative, supported feature before recommending custom code.`,
      sources:[
        {l:"Create Custom Appointment List Filters — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_appointment_list_filters_custom.htm&language=en_US&type=5"},
        {l:"Filter the Gantt in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_filter.htm&type=5"}
      ]
    },
    {
      topic:"Service Reports",
      select:2,
      prompt:"A Company needs to verify that a repair job has been completed to the customer satisfaction before an invoice can bee generated. Which two items should the consultant consider? Choose 2 answers.",
      options:[
        {k:"A", t:"Generate service in the organization's default language"},
        {k:"B", t:"Add service reports templates to the appropriate repair work type"},
        {k:"C", t:"Configure signature blocks for service report templates"},
        {k:"D", t:"Send a feedback survey to the customer when a service appointment is compted"}
      ],
      correct:["B","C"],
      explanation:
`**Why B and C are right.** Getting a customer's on-the-spot confirmation that a repair was done to their satisfaction, gating invoicing on it, takes two pieces working together. First, the Work Type itself carries a ServiceReportTemplateId field — Salesforce's own developer documentation describes it as "the service report template associated with the work type. When users create service reports from a work order or work order line item that uses this work type, the reports use this template." Assigning the right template to the repair Work Type (B) ensures the correct, purpose-built report is what gets generated for repair jobs. Second, that template needs a way to actually capture the customer's sign-off — Salesforce's Guidelines for Creating Service Report Templates document exactly this: "To let mobile workers collect signatures on a service report, drag the Signature element onto your layout," supporting up to 20 signature blocks per sub-template. Configuring a signature block (C) is what turns the report into a document the customer actively signs to certify the work is complete and satisfactory — the concrete "verification" gate the company can require before billing.

**Why A is wrong.** The Service Report Language setting only controls what language the PDF is translated into (falling back to the generating user's default language if left blank). It's a localization detail with nothing to do with confirming the customer's satisfaction with the work performed.

**Why D is wrong.** A feedback survey sent after a service appointment is completed is a downstream CSAT/feedback-loop tool, not a same-visit sign-off gate. It doesn't happen at the point of completion in a way that can block or verify anything before an invoice goes out — by the time a survey response might come back, the invoicing decision has typically already been made.`,
      sources:[
        {l:"WorkType — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_worktype.htm"},
        {l:"Field Service Guidelines for Creating Service Report Templates — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_customer_report_guidelines.htm&type=5"},
        {l:"Create Field Service Customer Reports — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_customer_reports.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:2,
      prompt:"A Service Technician at A Company handles yearly maintenance checks. The job usually lasts 2 to 3 hours. Due to the lack of customer availability, many appointments are cancelled or need to be rescheduled at the last minute. Which two features would be most helpful in aiding the dispatcher with updated schedules for technicians? Choose 2 answers",
      options:[
        {k:"A", t:"In-Day Optimization"},
        {k:"B", t:"Reshuffle"},
        {k:"C", t:"Resource Schedule Optimization"},
        {k:"D", t:"Group NearBy"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Salesforce's own Trailhead module on handling in-day changes pairs these two tools for exactly this situation — a schedule that's drifting because "mobile workers get sick," "customers reschedule appointments," and similar disruptions pile up during the day. In-Day Optimization (A) is the rapid, territory-wide re-optimization dispatchers run mid-shift — select Optimize, pick the affected territory and scheduling policy, and the engine "shifts appointments as needed until everything is back on track," without waiting for that night's global optimization run. Reshuffle (B) handles the companion problem of fitting a newly-scheduled or urgent appointment into a Gantt that already looks full: Salesforce describes it as letting dispatchers "schedule or reschedule critical appointments even when the Gantt seems to be full," moving lower-priority appointments to another day or resource to make room. Together they cover both halves of "many appointments cancelled or rescheduled at the last minute" — reoptimizing the broader schedule and slotting the resulting reschedules back in.

**Why C is wrong.** Resource Schedule Optimization operates on a single mobile worker's day, filling small gaps and overlaps for that one technician. It's a narrower, single-resource tool — not the pair of features built specifically for a dispatcher managing widespread, day-of disruption across a schedule.

**Why D is wrong.** Group Nearby is a Classic Dispatch Console action that unschedules later appointments and replaces them with geographically closer ones to cut down travel time — it's a travel-efficiency optimization, not a tool for absorbing cancellations or urgent reschedules, and it isn't even available when Enhanced Scheduling and Optimization is turned on.`,
      sources:[
        {l:"Optimizing Daily Schedules for Mobile Workers: Handle In-Day Changes — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/handle-inday-changes"},
        {l:"Reshuffle Service Appointments in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_reshuffling.htm&type=5"},
        {l:"Group Nearby Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_group_appointments.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A technician reported that the travel time calculated between appointments is often too short because of job delays throughout the day. Which setting should a consultant consider to improve travel time accuracy?",
      options:[
        {k:"A", t:"Street Level Routing. Default Travel Speed"},
        {k:"B", t:"Minimum Grade, Default Operating Hour"},
        {k:"C", t:"Estimated Travel Time, Minimize Travel"},
        {k:"D", t:"Travel Speed Unit, Actual Travel Time"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's own documentation explains exactly how travel time gets calculated, and why it can run short. Without Street Level Routing, Field Service uses "aerial routing" — "travel time is calculated by using the straight-line distance between the two points and the configured travel speed," which is the Default Travel Speed setting. That crude straight-line-plus-flat-speed math ignores real roads, turns, and traffic patterns, so it systematically underestimates travel time compared to reality. Street Level Routing replaces it with a calculation that "computes the average travel time it takes to drive from point to point based on car travel by road," which Salesforce states is "much more realistic and accurate than aerial calculations." A consultant facing chronically-too-short travel estimates should look at exactly these two settings: turn on (or verify) Street Level Routing, and review the Default Travel Speed used as its fallback.

**Why B is wrong.** Minimum Grade is a skill-proficiency threshold used in resource-matching, and Default Operating Hours define when a territory or resource is available to work — neither one has anything to do with how the system calculates the driving time between two appointments.

**Why C is wrong.** Estimated Travel Time is a calculated output field showing the system's current travel prediction, not a configurable input that changes how accurately that prediction is made. Minimize Travel is a scheduling policy objective/goal used to influence appointment ordering during optimization — it doesn't affect the underlying travel-time calculation method either.

**Why D is wrong.** Travel Speed Unit only controls whether speed is expressed in mph or km/h — a display/unit setting, not an accuracy lever. Actual Travel Time is a record of what travel time really turned out to be after the fact; it documents the outcome rather than improving the upfront prediction.`,
      sources:[
        {l:"Estimate Travel Times with Street-Level Routing — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_streetlevelrouting.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"An Agent has to create a Work Order for complex installation. A Work Order Line Item is created for each required component so it can be tracked and priced separately. However, a few of the components are only on the company's Preferred Price Book while others are on the U.S. Price Book. Which solution should a Consultant recommend so the agent can meet this requirement?",
      options:[
        {k:"A", t:"Create one Work Order for each Price Book and add Work Order Line Items to the appropriate Work Order based on its Price Book."},
        {k:"B", t:"Create one Work Order and add Work Order Line Items based on the Price Book selected on the Work Type."},
        {k:"C", t:"Create one Work Order for each Price Book use Work Types to assign the Price Book to each Work Order Line Item."},
        {k:"D", t:"Create one Work Order and override the price on Work Order Line Items for products on the Preferred Price Book."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's own Field Service Pricing Data Model documentation is explicit that a Work Order is restricted to one Price Book: "If you specify a price book on a work order, this allows you to link each work order line item to a price book entry" — you "select a price book in the Price Book lookup field on the work order," then every Line Item under it selects its product via that same book's Price Book Entry lookup. Since the components here are split across two different Price Books (Preferred and U.S.) that can't both be attached to a single Work Order, the only way to properly track and price every component is to create one Work Order per Price Book and add each component's Line Item to whichever Work Order matches its book. That keeps every Line Item correctly linked to a valid Price Book Entry.

**Why B is wrong.** There's no mechanism where a Work Type "selects" the Price Book used for Work Order Line Items — the Price Book lookup (Pricebook2Id) lives on the Work Order itself, not the Work Type, and a single Work Order still can't reference two Price Books no matter how the Work Type is configured.

**Why C is wrong.** This gets the object model backwards — Work Types don't assign a Price Book per individual Line Item. The Price Book relationship is set once, at the Work Order level, and inherited by all of that Work Order's Line Items together; there's no supported way to mix two Price Books across Line Items on one Work Order via Work Type configuration.

**Why D is wrong.** Manually overriding prices on Line Items doesn't solve the actual problem — the components on the Preferred Price Book need a valid Price Book Entry to be added as Line Items in the first place. If the Work Order's Price Book is the U.S. Price Book, products that only exist on the Preferred Price Book have no entry to select and can't be added at all; overriding a price after the fact doesn't create the missing Price Book Entry relationship.

This is confirmed directly by the WorkOrderLineItem object's own field description, not just inferred from the Work Order side: PricebookEntryId's documented behavior is "This field's lookup search only returns products that are included in the work order's price book." That's a hard, enforced constraint on the Line Item's product picker itself — once a Work Order's Price Book is set, there is no way to select a Price Book Entry from any other Price Book on that Work Order's Line Items, which is exactly why splitting across two Work Orders (one per Price Book) is the only way to add every required component.`,
      sources:[
        {l:"Field Service Pricing Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_pricing.htm"},
        {l:"WorkOrder — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorder.htm"},
        {l:"WorkOrderLineItem — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderlineitem.htm"}
      ]
    },
    {
      topic:"Work Types",
      select:1,
      prompt:"A Company typically performs installs, break-fix, and inspections for all clients. The Service Manager wants to create a template for common work requests. What should a Consultant implement to assist the dispatch team?",
      options:[
        {k:"A", t:"Work Type Line Items for Install, Break-fix, and Inspections."},
        {k:"B", t:"Work Order Record Types for Break-fix, Install, and Inspection."},
        {k:"C", t:"Work Types and Skill Requirements for Install, Break-fix, and Inspections."},
        {k:"D", t:"Work Order custom fields to Install, Break-fix, and Inspections."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own Work Type documentation describes this exact scenario almost word for word: "your business performs the same tasks for multiple customers. Work types are templates that save you time and make it easier to standardize your field service work," illustrated with a company creating "Install Heater, Repair Heater, and Replace Heater" Work Types — the same install/repair/inspection pattern as this Company's install/break-fix/inspection jobs. Crucially, the setup guidance also has you "add required skills to represent the expertise or certification needed to complete the work" via the Work Type's Skill Requirements related list. That's what actually helps dispatch: when a Work Order is created from a Work Type, it inherits that Work Type's Skill Requirements automatically, so dispatch can match each job to a technician who's actually qualified for it — not just a labeled category of work.

**Why A is wrong.** "Work Type Line Items" isn't a real Salesforce Field Service object — Line Items live on Work Orders (Work Order Line Items), not on Work Types. A Work Type template carries Skill Requirements and Products Required, not "line items."

**Why B is wrong.** Record Types are a generic, non-Field-Service-specific Salesforce mechanism for varying page layouts and picklist values on any object. Salesforce built the dedicated Work Type object specifically to solve the "template for common jobs" requirement, and its own documentation points directly to Work Types for this — not to reusing the general-purpose Record Type feature.

**Why D is wrong.** Custom fields just add the same extra data points to every Work Order uniformly — they don't create distinct, reusable templates for different job types, and they carry no skill or parts requirements that would actually help dispatch route work to the right technician.`,
      sources:[
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A Company wants to ensure that Service Appointments are only assigned to Active Resources. Which configuration should a Consultant for the Scheduling Policy?",
      options:[
        {k:"A", t:"Match Fields"},
        {k:"B", t:"Preferred Resources"},
        {k:"C", t:"Match Boolean"},
        {k:"D", t:"Required Resources"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own documentation names this exact use case as its standard example for this work rule type: "Field Service includes a standard Match Boolean work rule named Active Resources. This work rule: Assures that only active service resources are considered for scheduling." A Match Boolean work rule "enforces scheduling preferences based on a checkbox (Boolean) field on service resources" — you point it at the resource's Active checkbox and set "Value is True," and only resources with that box checked become eligible candidates for scheduling. That's precisely the mechanism a Consultant should add to the Scheduling Policy to meet this requirement.

**Why A is wrong.** Match Fields compares a field on the Service Appointment to a field on the Service Resource (for example, matching a required skill level to a resource's skill level) — it's a two-sided comparison rule, not a simple checkbox gate on the resource's active status.

**Why B is wrong.** Preferred Resources influences the optimizer's ranking toward a specific resource already associated with the customer or account — it's about resource preference/continuity, not about filtering out inactive resources from consideration entirely.

**Why D is wrong.** Required Resources is used to mandate that specific named resources (or a resource meeting specific hard requirements) must be assigned to a Service Appointment — it doesn't provide a general checkbox-based filter for excluding every inactive resource from scheduling org-wide.`,
      sources:[
        {l:"Work Rule Type: Match Boolean — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_optimization_theory_work_rules_match_boolean.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Match Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_match_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:2,
      prompt:"In which two scenarios should a consultant recommend multi day Service Appointment? Choose 2 answers",
      options:[
        {k:"A", t:"Jobs require multiple stages of work performed by different resources."},
        {k:"B", t:"Jobs can take longer than the available resources hours in a day"},
        {k:"C", t:"Jobs need to be performed at the same site on the same day of the week."},
        {k:"D", t:"Jobs require consecutive days of work and can span over weekends."}
      ],
      correct:["B","D"],
      explanation:
`**Why B and D are right.** Salesforce's own documentation and worked example for Multiday Service Appointments describe exactly these two situations. B is the headline example straight from Salesforce Help: a job needing 10 hours of work where the resource's operating hours only run 9am–6pm (about 9 hours minus travel/breaks) — the job simply can't fit in one resource's single working day, so the appointment has to span into a second day. The documentation frames the whole feature around this: "you can schedule service appointments that span resources' nonavailability without rule violations," with the engine automatically factoring in operating hours, travel, and breaks across each day. D captures the other core use case — a single continuous job requiring several consecutive calendar days, where the appointment needs to persist through non-working gaps (evenings, and yes, weekends) without Salesforce treating that gap as a scheduling violation or auto-unscheduling the appointment; Salesforce even caps this at "no more than eight weeks," implicitly acknowledging appointments can and do stretch across multiple weekends.

**Why A is wrong.** Work needing different resources for different stages is a job made of genuinely separate visits — that's what Scheduling Dependencies (Same Start, Start After Finish, etc.) or multiple Work Order Line Items each with their own Service Appointment are for. A single multiday Service Appointment represents one continuous span of work, not a handoff between different resources doing different stages.

**Why C is wrong.** A recurring weekly visit to the same site is a repeating-schedule pattern — that's what a Maintenance Plan with a recurring Work Type is built for (generating a new Work Order/Service Appointment each cycle), not a single Service Appointment stretched across multiple days.`,
      sources:[
        {l:"Enable Multiday Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Service Territories",
      select:1,
      prompt:"A Company wants to assign Service Appointment based on the Polygon of the child Service Territory in the hierarchy. How should a Consultant assign Service Appointments to the Polygon?",
      options:[
        {k:"A", t:"Set the Territory Assignment Policy to the Lowest Level."},
        {k:"B", t:"Set the Territory Assignment Policy to the Highest Level."},
        {k:"C", t:"Set the Polygon Assignment Policy to the Highest Level."},
        {k:"D", t:"Set the Polygon Assignment Policy to the Lowest Level."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's Map Polygons documentation describes exactly this mechanism: "If a service appointment's geolocation matches more than one polygon, the appointment is assigned to either the highest or lowest-level territory in the hierarchy depending on your settings." The field that controls this is the Territory Assignment Policy on the Service Territory, and setting it to Lowest Level routes the appointment to the most specific, child-level territory's polygon in the hierarchy — precisely the outcome the Company wants.

**Why B is wrong.** Setting Territory Assignment Policy to Highest Level does the opposite of what's needed — it routes the overlapping appointment to the broader parent territory instead of the specific child territory.

**Why C is wrong.** There's no field called "Polygon Assignment Policy" in Field Service — the actual setting is the Territory Assignment Policy on Service Territory. Naming a nonexistent field means this option can't be implemented regardless of which level is chosen.

**Why D is wrong.** Same problem as C — "Polygon Assignment Policy" isn't a real Field Service configuration option, so pairing it with "Lowest Level" doesn't produce a working solution even though "Lowest Level" is the correct value for the real field (Territory Assignment Policy).`,
      sources:[
        {l:"Create and Manage Map Polygons — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_map_polygons.htm&type=5"}
      ]
    },
    {
      topic:"Licensing",
      select:1,
      prompt:"An employee at A Company performs the role of a dispatcher and a technician. How should a consultant configure the field service lightning to support this behavior?",
      options:[
        {k:"A", t:"Create two Skills records and assign them to Services Resources record"},
        {k:"B", t:"Create two Service Resources and assign them to the employee"},
        {k:"C", t:"Create one Service Resource and assign the technician and dispatcher role"},
        {k:"D", t:"Create one Service Resource and Assign the relevant Permissions Set License"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** A Service Resource represents one real person, tied to a single User record — it's the object that lets someone be scheduled and dispatched as a technician. Since this is one employee doing both jobs, they still only need one Service Resource. What changes is the underlying User's access: assigning the relevant Permission Set License (the Field Service Dispatcher permission set license, alongside whatever license already gives them technician/mobile access) is what unlocks the Dispatcher Console for that same person, on top of their existing technician capabilities. One person, one Service Resource, and the extra permission set license is what grants the second role's capabilities.

**Why A is wrong.** Skills represent competencies or certifications (like "Electrical" or "HVAC Certified") used for skill-based matching during scheduling — they have nothing to do with granting dispatcher-level system access or console permissions.

**Why B is wrong.** Service Resource is meant to represent one real person; creating two Service Resource records for the same employee would duplicate them in the resource pool, distort utilization and capacity reporting, and create confusion about which record actually reflects the person's true availability and workload.

**Why C is wrong.** There's no field or mechanism on Service Resource called "role" that you set to a combined value like "technician and dispatcher" — that's not an actual configuration step in Field Service. Access to dispatcher capabilities comes from permission set licenses and permission sets assigned at the User level, not from a role field on the resource record.`,
      sources:[
        {l:"Create Service Resources for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_resources.htm&language=en_US&type=5"},
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000383184&language=en_US&type=1"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:2,
      prompt:"Time Sheet Entries can be associated to which two objects? Choose 2 answers",
      options:[
        {k:"A", t:"Work Order"},
        {k:"B", t:"Work Order Line Item"},
        {k:"C", t:"Assigned Resources"},
        {k:"D", t:"Service Resource"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** The Field Service Developer Guide's TimeSheetEntry object reference lists exactly two record-relationship lookup fields beyond its parent TimeSheet: WorkOrderId, described as "the work order related to the time sheet entry," and WorkOrderLineItemId, "the work order line item related to the time sheet entry." These let a technician's logged time block (repair work, travel, a break, etc.) be tied directly to the specific job — either the Work Order as a whole or one of its Line Items — that the time was spent on.

**Why C is wrong.** There's no "Assigned Resources" lookup field on TimeSheetEntry. Assigned Resource is a separate junction object linking a Service Resource to a Service Appointment — it isn't one of the record types a Time Sheet Entry associates to.

**Why D is wrong.** Service Resource isn't referenced directly on TimeSheetEntry either — the resource whose time is being tracked is identified through the parent TimeSheet record (which is tied to a Service Resource), not through a lookup on the Entry itself.`,
      sources:[
        {l:"TimeSheetEntry — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_timesheetentry.htm"}
      ]
    },
    {
      topic:"Dispatching",
      select:1,
      prompt:"A Company wants to improve overall responsiveness to customers. Which Dispatch Technique should the Consultant implement to provide the greatest schedule flexibility?",
      options:[
        {k:"A", t:"Enable Drip-feed to dispatch the next appointments."},
        {k:"B", t:"Configure the Auto Dispatch Scheduled Job."},
        {k:"C", t:"Leverage Resource Schedule Optimization."},
        {k:"D", t:"Shuffle daily work manually via the Gantt."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Drip Feed dispatching operates continuously throughout the day rather than in one batch — it dispatches a controlled number of appointments to a resource and automatically sends the next one as each is completed. Salesforce's own community guidance on this contrast is direct: drip feed "can take care of any appointments scheduled to the service resources...throughout the day," making it the technique built specifically to stay responsive to same-day changes, last-minute reschedules, and evolving customer needs — exactly the "greatest schedule flexibility" the question is asking for.

**Why B is wrong.** The Auto Dispatch Scheduled Job runs at fixed, predetermined intervals (for example, once each morning) over a set time horizon. Anything that changes after that run — a cancellation, a new emergency job, a delay — has to wait for the next scheduled run to be picked up, which is the opposite of the flexibility the company wants.

**Why C is wrong.** Resource Schedule Optimization operates on a single mobile worker's day at a time, filling gaps for that one resource. It's a narrower, single-resource optimization tool, not a dispatch cadence technique built to maximize day-to-day responsiveness across the whole operation.

**Why D is wrong.** Manually shuffling work on the Gantt is the least scalable, least consistent option — it depends entirely on a dispatcher noticing and acting on every change individually, which doesn't provide systematic flexibility and doesn't scale as the volume of appointments grows.`,
      sources:[
        {l:"Drip Feed Versus Auto Dispatch — Trailblazer Community", u:"https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007YvR4kSAF"}
      ]
    },
    {
      topic:"Work Orders & Appointments",
      select:1,
      prompt:"A Company wants to track when Technicians need to visit a customer site multiple times to resolve an issue. How should a Consultant configure this using a single Work Order.",
      options:[
        {k:"A", t:"Create a new Service Appointment for Each site visit."},
        {k:"B", t:"Create a new Work Order Line Item for each site visit."},
        {k:"C", t:"Create a new Child Work Order for each site visit."},
        {k:"D", t:"Create a new Product Consumed for each site visit."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce Help states it directly: "You can have multiple service appointments (visits) per work order, depending on the nature of the job," giving the example that when a job needs several separate trips, "each visit is a separate service appointment." The Work Order stays as the single container describing the overall job to resolve the issue, while each individual trip out to the site is logged as its own Service Appointment underneath it — its own scheduling window, assigned resource, status, and check-in/check-out. That's exactly the object Field Service designed to represent "one visit," so it's the correct unit to add per return trip.

**Why B is wrong.** A Work Order Line Item represents a discrete piece of work, product, or task within the Work Order (for example, one component to install or one specific repair task) — it's a unit of *work content*, not a unit of *time or scheduling*. Line Items don't carry their own appointment window, assigned resource, or dispatch status, so adding one per visit wouldn't actually let the Consultant schedule, dispatch, or track each individual trip; it would just describe more work, not more visits.

**Why C is wrong.** Creating a Child Work Order for each visit introduces unnecessary complexity and fragments the single issue across multiple parent/child Work Order records, which then each need their own set of Line Items, statuses, and reporting rollups. The scenario specifically asks for a solution using "a single Work Order" — multiplying Work Orders is the opposite of what's being asked for, and Salesforce's own guidance points to multiple Service Appointments on one Work Order as the intended pattern for a job requiring several visits.

**Why D is wrong.** A Product Consumed record tracks a part or item that was used up or installed during a visit (for inventory and van-stock reconciliation) — it has nothing to do with representing a scheduled visit itself. Logging one per site visit would only track parts usage, not the fact that a technician needs to return to the site, so it doesn't address the tracking requirement at all.`,
      sources:[
        {l:"Create Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_appointments.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:2,
      prompt:"Which two objects are required when configuring an optimization job? (Select all that apply)",
      options:[
        {k:"A", t:"Polygons"},
        {k:"B", t:"Work Type"},
        {k:"C", t:"Service Territory"},
        {k:"D", t:"Scheduling Policy"}
      ],
      correct:["C","D"],
      explanation:
`**Why C is right.** Every optimization run — whether it's a scheduled Global Optimization job or a single-resource Resource Schedule Optimization — operates against one or more Service Territories as its scope. Salesforce's own Trailhead walkthrough of configuring a scheduled Global Optimization job shows "Effective Territories" as one of the two mandatory selections needed just to set the job up, and the Monitor Optimization Requests documentation confirms this at the record level too: "Each optimization run creates a Territory Optimization Request record for every service territory in the run." Without at least one territory selected, there's no data domain (appointments, resources, rules) for the optimizer to act on.

**Why D is right.** A Scheduling Policy is the other mandatory selection in that same Trailhead configuration walkthrough (the example uses "Customer First") — it's the object that bundles the work rules and service objectives (weighted priorities like travel time, skill match, or urgency) the optimizer actually evaluates candidates against. Salesforce Help's optimization-request documentation lists "the scheduling policy" as one of the core details captured on every optimization request record, alongside the territory. Without a Scheduling Policy, the optimizer has no rule set or objective function to score and rank scheduling options.

**Why A is wrong.** Polygons are a geolocation tool used to assign incoming Service Appointments to the correct Service Territory based on where they fall on a map (as seen in territory hierarchy and appointment-assignment scenarios). They're a territory-assignment mechanism, not a setting on the optimization job itself — Trailhead's own configuration walkthrough for scheduling a Global Optimization job makes no mention of polygons at all.

**Why B is wrong.** Work Type is a job "template" used to standardize things like default duration, required Skills, and Skill Requirements for a category of work (installs, break-fix, inspections) — it shapes how individual Work Orders and Service Appointments get created, but it isn't a configuration input on the optimization job itself. An optimization run cares about which territories and which policy to evaluate against, not which Work Type templates generated the appointments in scope.`,
      sources:[
        {l:"Global Optimization Planning for Efficient Scheduling — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/plan-ahead-with-global-optimization"},
        {l:"Monitor Field Service Schedule Optimization Requests — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=pfs_monitor_optimization_requests.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Entitlements & Milestones",
      select:1,
      prompt:"Universal Containers maintains their service level agreements at the customer level only. How can a consultant ensure agents can verify coverage?",
      options:[
        {k:"A", t:"Set up Entitlement Process, set up Service Contracts, display the related List on the Contact Page Layout."},
        {k:"B", t:"Create Milestones, set up Entitlement Process, display the Related List on the Work Order Page layout."},
        {k:"C", t:"Create Milestones, set up Entitlement Process, display the related List on the Account Page Layout."},
        {k:"D", t:"Create Contract Line Items, set up Entitlement Process, display the related List on the Asset Page Layout."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's entitlement management model scales in complexity to match how granularly a company needs to track coverage: "Entitlements Only" for account-level support terms, "Entitlements + Service Contracts" for time-bound contract coverage, and "Entitlements + Service Contracts + Line Items" for per-product/asset-level coverage. Since Universal Containers tracks SLAs "at the customer level only" — with no need to break coverage down by product, asset, or contract line — the Entitlements-Only model tied directly to the Account is the right fit. Entitlement Processes define the timeline of steps, and Milestones are the individual time-based checkpoints (e.g., first response, resolution) within that process that reps must hit to stay within the SLA. Since the entitlement itself lives on the Account, adding the Entitlements related list to the Account Page Layout is what lets a support agent open the customer's Account and immediately see what coverage they're entitled to and how they're tracking against it.

**Why A is wrong.** Setting up Service Contracts adds a layer of contract-bound coverage (start/end dates, renewal terms) that isn't needed when SLAs are tracked purely at the customer level with no contractual time-boxing implied by the scenario — that's a heavier model than "customer level only" calls for. It also places the related list on the Contact Page Layout, but entitlement coverage in Salesforce is a property of the Account (the customer/company), not an individual Contact person at that account.

**Why B is wrong.** Displaying the related list on the Work Order Page Layout puts coverage visibility on a Field Service job record instead of the customer record itself. An agent trying to verify "does this customer have coverage" before a Work Order even exists has no Work Order to look at yet — the check has to happen at the Account level, upstream of any specific job.

**Why D is wrong.** Contract Line Items break entitlements down per product/asset within a contract — exactly the fine-grained, per-asset tracking the scenario says Universal Containers does *not* need, since they track coverage "at the customer level only." Placing the related list on the Asset Page Layout compounds the mismatch: it ties coverage visibility to a specific piece of equipment rather than to the customer as a whole.`,
      sources:[
        {l:"Getting Started with Salesforce Entitlements", u:"https://focusonforce.com/service-cloud/getting-started-with-salesforce-entitlements/"},
        {l:"Complete Guide to Salesforce Entitlements and Milestones in Service Cloud — Salesforce Ben", u:"https://www.salesforceben.com/complete-guide-to-salesforce-entitlements-and-milestones-in-service-cloud/"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:3,
      prompt:"In the Dispatch Console, when viewing the Map, which three data element can be presented on the Dispatcher? (Choose three)",
      options:[
        {k:"A", t:"Google Traffic Data"},
        {k:"B", t:"Service Appointment Dependencies"},
        {k:"C", t:"Resource's Home Base"},
        {k:"D", t:"Service Appointments"},
        {k:"E", t:"Resource Travel Speed"}
      ],
      correct:["A","C","D"],
      explanation:
`**Why A is right.** Salesforce's own documentation for customizing the Dispatch Console map describes a dedicated toggle for this: "Click Traffic at the top of the map to show traffic conditions" — a live Google-powered traffic overlay so a dispatcher can see congested routes before assigning or re-routing a technician.

**Why C is right.** The same documentation confirms the map can plot "the selected service resource's home base, set on their detail page" — letting a dispatcher see where a mobile worker starts and ends their day relative to the jobs being considered for them.

**Why D is right.** The map's core function is plotting "all service appointments that are assigned to the selected service resource" as pins, so the dispatcher can visually see the day's jobs in relation to traffic, other resources, and territory boundaries — this is the map's primary data layer, not an optional extra.

**Why B is wrong.** Service Appointment Dependencies (one appointment needing to happen before or after another) is a *scheduling logic* concept enforced by Scheduling Policies and Work Rules — it constrains how the optimizer sequences work, but it isn't a visual data layer Salesforce documents as being drawn on the Dispatch Console map itself.

**Why E is wrong.** Resource Travel Speed is a configuration input (part of a resource's or territory's travel-time calculation settings) used behind the scenes to estimate drive times for scheduling — it's a number the engine consumes, not a layer of information rendered visually on the map for a dispatcher to look at.`,
      sources:[
        {l:"Customize the Field Service Dispatcher Console Map — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_using_map.htm&type=5"}
      ]
    },
    {
      topic:"Products & Pricing",
      select:1,
      prompt:"Universal Containers wants to invoice its customers for the parts used when performing repairs on installed Assets. What should a Consultant recommend to track the price of the parts consumed?",
      options:[
        {k:"A", t:"Use Products and Price Books to track the price."},
        {k:"B", t:"Use Opportunity Line Items and Price Book to track the price."},
        {k:"C", t:"Use a custom object to model the Work Order pricing and price."},
        {k:"D", t:"Use Assets and Products to track the price."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The record that actually captures a used part for invoicing purposes is Product Consumed, and the Field Service Developer Guide shows it's built to carry pricing natively: it has a **PricebookEntryId** ("Price book associated with the product consumed"), a **UnitPrice** ("The price per unit of the product consumed"), and a **TotalPrice** ("The total price paid for the product items"). A PricebookEntry only exists as a Product tied to a Price Book, so getting a real, invoiceable price onto a consumed part requires exactly the combination in A: the part must be modeled as a Product, and priced through a Price Book, so the Product Consumed record can pull a PricebookEntry and calculate Unit/Total Price automatically.

**Why B is wrong.** Opportunity Line Items are a Sales Cloud construct for pricing products on a *sales opportunity* — they have no relationship to Work Orders, Work Order Line Items, or Product Consumed records, and nothing in Field Service reads from them to price repair parts. This mixes up which part of the platform actually prices field-service parts consumption.

**Why C is wrong.** Salesforce already ships a native mechanism for this exact requirement (Products, Price Books, PricebookEntry, and the pricing fields built into Product Consumed) — building a custom object to reinvent Work Order pricing duplicates functionality that already exists out of the box, adds unnecessary maintenance and reporting overhead, and forfeits the native rollups and standard functionality (like the automatic inventory decrement tied to Product Consumed) that come with using the standard objects.

**Why D is wrong.** Assets represent the installed equipment being repaired — they don't carry pricing information and have no relationship to a Price Book. "Products and Assets" alone is missing the one object that actually determines a dollar amount: PricebookEntry, which only exists once a Product is placed on a Price Book. Without a Price Book in the mix, there's no price to pull onto the Product Consumed record at all.`,
      sources:[
        {l:"ProductConsumed — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productconsumed.htm"},
        {l:"Field Service Pricing Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_pricing.htm"}
      ]
    },
    {
      topic:"Products & Pricing",
      select:2,
      prompt:"Universal Containers wants to track the total associated price when servicing Work Orders for Customers. Which two of the following should a Consultant recommend? (Choose two)",
      options:[
        {k:"A", t:"Use Work Order and Work Order Line Items."},
        {k:"B", t:"Use a custom object to model to model the Work Order pricing."},
        {k:"C", t:"Use the Einstein Pricing Configurator."},
        {k:"D", t:"Set up Products and Price Books."}
      ],
      correct:["A","D"],
      explanation:
`**Why A is right.** Salesforce's own Work Order creation documentation confirms that "pricing details like discounts and unit price are set at the line item level" — the Work Order Line Item is the actual record where List Price, Discount, and Quantity live for each unit of work or part, and the Work Order itself can track an overall tax amount against a stated total price. That makes Work Order and Work Order Line Items the object pair where the servicing price is actually entered, itemized, and rolled up for a given job.

**Why D is right.** Those line-item price fields don't come from nowhere — the same documentation states that when creating a Work Order, you "select a price book" to "link each work order line item to a price book entry (product)." A PricebookEntry only exists once a Product is placed on a Price Book, so Products and Price Books are the catalog layer that actually supplies the per-unit price a Work Order Line Item pulls in. Without setting these up, there's no priced catalog for the Work Order Line Items in A to reference — the two are a matched pair, one supplying the price data, the other capturing and totaling it for the specific job.

**Why B is wrong.** Salesforce already ships the full native mechanism for this (Work Order, Work Order Line Item, Products, Price Books, and PricebookEntry) — modeling Work Order pricing with a custom object duplicates functionality that already exists out of the box and forfeits the native rollups, reporting, and standard mobile/UI support that come from using the standard objects.

**Why C is wrong.** "Einstein Pricing Configurator" isn't a real Field Service capability — Salesforce's product configuration and pricing tooling under the Einstein/Commerce umbrella is scoped to B2C Commerce, not Field Service Work Orders, and there's no such tool in the Field Service Developer Guide or Help documentation for tracking servicing price on a Work Order.`,
      sources:[
        {l:"Create Field Service Work Orders — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=fs_create_wo.htm&type=0"},
        {l:"Field Service Pricing Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_pricing.htm"}
      ]
    },
    {
      topic:"Mobile Capture",
      select:1,
      prompt:"Universal Containers wants their Technicians to record an Asset Number using a barcode scanner when completing Work Orders. What field type should be configured to capture this information?",
      options:[
        {k:"A", t:"Barcode"},
        {k:"B", t:"Date"},
        {k:"C", t:"Formula"},
        {k:"D", t:"Text"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** The Field Service mobile app's barcode scanner isn't a separate field type — it's a capture tool that attaches itself to ordinary Text fields. A Trailblazer Community answer on this exact behavior states it plainly: "The barcode scanner always shows on fields that take text input." That matches how the underlying BarcodeScanner API works too: the Field Service Developer Guide confirms it "provides to your component a string value of the data encoded in a scanned barcode" — a plain string, which needs a standard Text field to be written into. So to let a technician tap the scanner icon and populate an Asset Number by scanning, the Consultant just needs a Text field on the Work Order (or Work Order Line Item) — the scanner UI appears automatically wherever text input is accepted.

**Why A is wrong.** There is no "Barcode" field type in Salesforce's field type palette. Standard and custom field types are things like Text, Text Area, Number, Currency, Percent, Date, Date/Time, Checkbox, Picklist, Lookup, Master-Detail, and Formula — barcode scanning is a UI capability layered onto a Text field, not a distinct data type a Consultant selects when creating the field.

**Why B is wrong.** A Date field only accepts calendar date values through a date picker — it has no free-text input for the scanner to populate, and an Asset Number is typically an alphanumeric string, not a date. The scanner has nothing to write into on a Date field.

**Why C is wrong.** A Formula field is read-only and calculated automatically from other fields or values — it has no direct user input at all, on mobile or otherwise, so there's no editable text box for the barcode scanner to attach to or write a scanned value into.`,
      sources:[
        {l:"Barcode Scanner for Salesforce Field Service — Trailblazer Community", u:"https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000A8tgoSAB"},
        {l:"Scan Barcodes on a Mobile Device — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_mobile_lwc_barcode_scanner.htm"}
      ]
    },
    {
      topic:"Mobile Access",
      select:1,
      prompt:"Universal Containers has a Partner Community. Work Orders are assigned to these partners. Service Appointments or Service Resources are hidden from partners. How would a Partner user update the Work Order record from a mobile Device?",
      options:[
        {k:"A", t:"Field Service Mobile App"},
        {k:"B", t:"Salesforce Mobile App"},
        {k:"C", t:"Work Order Records are unavailable on a mobile device"},
        {k:"D", t:"Salesforce Touch"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Field Service mobile app (option A) is built around a Service Resource's own schedule — Salesforce's own documentation on giving users access to it states "each user needs Read access to their service resource record," meaning the app fundamentally depends on the logged-in user having a Service Resource record it can read from. The scenario explicitly says Service Appointments and Service Resources are hidden from partners, so a partner user has no Service Resource record for the Field Service mobile app to hang its schedule/dispatch UI on. The standard Salesforce mobile app, by contrast, is the general-purpose app for viewing and editing any standard or custom object a user has access to — including Work Order — based purely on ordinary object and field-level permissions/sharing, with no dependency on Field Service licensing or a Service Resource record. Since the partner only needs to view/update the Work Order itself (not schedule or manage appointments), the standard Salesforce mobile app is the correct, license-appropriate tool.

**Why A is wrong.** As explained above, the Field Service mobile app requires a readable Service Resource record for the logged-in user, and it's licensed and designed for internal/contractor service resources actively performing dispatched field work — not for partner users who are explicitly walled off from Service Resource and Service Appointment data. Salesforce's own contractor setup guide confirms this is a *different* deployment model: contractors who use the Field Service mobile app do so specifically because they (or their manager) hold a Service Resource record and interact directly with Service Appointments — the opposite configuration from this scenario, where those objects are deliberately hidden from the partner.

**Why C is wrong.** Work Order is a standard Salesforce object; there's no platform limitation that makes it inaccessible from a mobile device. Any user with the right object/field-level access — including a properly configured Partner Community user — can view and update a Work Order record through the standard Salesforce mobile app.

**Why D is wrong.** Salesforce Touch was Salesforce's early mobile web app, which was retired and folded into Salesforce1 back in the Spring '14 release, later evolving into today's Salesforce mobile app. It's a legacy product name, not a currently available or recommendable option.`,
      sources:[
        {l:"Give Users Access to the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_perms_standard.htm&language=en_US&type=5"},
        {l:"Spring '14: Salesforce Touch Has Upgraded to Salesforce1 — Stratus Hub", u:"https://www.stratushub.com/blog-content/salesforce/spring-14-salesforce-touch-has-upgraded-to-salesforce1"},
        {l:"Set Up Contractors for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_setting_up_contractors.htm&type=5"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:3,
      prompt:"The Dispatcher at A Company wants to schedule Service Appointments from Dispatch Console while taking the Scheduling Policy into consideration. Which three options are available to the Dispatcher? (Select all that apply)",
      options:[
        {k:"A", t:"Select a Service Appointment from the list, use the \"Change Status\" action and \"Dispatch\"."},
        {k:"B", t:"Select a Service Appointment from the list and use the \"Schedule\" action."},
        {k:"C", t:"Select a Service Appointment from the list, use the \"Candidates\" action, and select the best time slot."},
        {k:"D", t:"Select multiple Service Appointments from the list and bulk schedule item."}
      ],
      correct:["B","C","D"],
      explanation:
`**Why B is right.** Trailhead's own walkthrough of the Dispatcher Console describes the Schedule action directly: "the appointment is automatically scheduled to a mobile worker with the correct skills and availability." That matching process — finding a qualified, available resource and a valid time slot — is exactly what runs against the currently-applied Scheduling Policy's work rules and objectives, so Schedule is a policy-driven action.

**Why C is right.** The Get Candidates action generates a filtered list of qualified resources for the selected appointment, letting the dispatcher "group them by date to see who is available at the best time" and then pick a candidate and time slot manually. That candidate list is itself built by scoring and filtering resources against the Scheduling Policy's rules and objectives — the dispatcher is choosing from policy-vetted options rather than bypassing the policy.

**Why D is right.** Bulk Schedule lets a dispatcher select multiple Service Appointments from the list and run the same automatic Schedule logic across all of them at once — the same policy-driven matching as the single-appointment Schedule action, just applied in batch to save time when handling many appointments.

**Why A is wrong.** "Change Status" → "Dispatch" is a post-scheduling action, not a scheduling one. Trailhead's own description of Dispatch is that it changes the appointment's status and sends "the mobile worker a notification on their mobile phone" — it presumes the appointment already has a resource and time slot assigned, and its job is just to formally notify that worker and flip the status. It doesn't run any matching logic against the Scheduling Policy at all, which is exactly what the question is asking about.`,
      sources:[
        {l:"Manage Service Appointments — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments"},
        {l:"Working in the Field Service Dispatcher Console Appointment List — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_appointments_list.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"Dispatchers at A Company want to ensure resources assigned to a Work Order have the appropriate level of expertise. What should a Consultant implement to accomplish this requirement?",
      options:[
        {k:"A", t:"Define Work Types, Define Work Order Status, Set up Resources Skills"},
        {k:"B", t:"Set up Service Locations, Set up Location Skills, Define Work Types"},
        {k:"C", t:"Define Skills, Set up Skill Requirements, Set up Resource Skills"},
        {k:"D", t:"Set up Skill Requirements, Define Work Types, Set up Routing Rules"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own documentation lays out this exact three-step chain: "skills must be created before they can be added as a requirement" (Define Skills first), then "add skill requirements to work types, work orders, and work order line items so they can be checked against a service resource's assigned skills" (Skill Requirements, each with a skill level from 0–99.99), and finally the resource side of the match — a Service Resource needs matching Skills assigned to it (Resource Skills) for the comparison to have anything to check against. Once all three pieces exist, the Match Skills work rule "ensures that appointments are assigned only to service resources who possess the required skills listed on the parent record" — which is precisely the expertise-matching outcome Dispatchers want.

**Why A is wrong.** Work Order Status is a workflow/lifecycle field (New, In Progress, Completed, Cannot Complete, etc.) that tracks where a job stands — it has nothing to do with matching a resource's expertise to a job's requirements. Swapping "Define Work Order Status" in for "Set up Skill Requirements" removes the actual mechanism that links a job's needed skill level to a candidate resource.

**Why B is wrong.** "Location Skills" isn't a real Salesforce Field Service concept — Skills in Field Service are defined and assigned at the Service Resource level (the person), not the Service Location (the place). This option also never establishes any Skill Requirement on the Work Order itself, so there'd be nothing for a resource's skills to be checked against even if "Location Skills" existed.

**Why D is wrong.** This option is missing the foundational step of defining the Skills themselves — you can't set up a Skill Requirement referencing a Skill that hasn't been created. It also substitutes "Routing Rules," which is a Salesforce Omni-Channel / Service Console feature for skills-based routing of cases and work items to agents — a completely different product area from Field Service's resource-to-Work-Order skill matching.`,
      sources:[
        {l:"Add Required Skills to Work Orders or Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_required_skills.htm&language=en_US&type=5"},
        {l:"SkillRequirement — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_skillrequirement.htm"}
      ]
    },
    {
      topic:"Work Types",
      select:3,
      prompt:"Which three objects are associate to the Work Type? (Select all that apply)",
      options:[
        {k:"A", t:"Resources"},
        {k:"B", t:"Skill Requirements"},
        {k:"C", t:"Service Appointments"},
        {k:"D", t:"Work Orders"}
      ],
      correct:["B","C","D"],
      explanation:
`**Why B is right.** The Field Service Developer Guide describes Skill Requirement's parent-linking field, RelatedRecordId, as polymorphic: "can be a work order, work order line item, work type, or pending service routing record." Work Type is one of the documented valid parents for a Skill Requirement — which is exactly the mechanism that lets a Work Type template carry its own set of required skills and levels.

**Why C is right.** Salesforce's own Service Appointment field reference confirms this directly: Service Appointment has a "Work Type" field, described as "the work type associated with the service appointment" (read-only, inherited from parent). So a Service Appointment carries a real, documented link back to the Work Type of the job it belongs to.

**Why D is right.** Work Order has a Work Type lookup field, and Salesforce's own documentation describes the relationship from the other direction too: "Adding a work type to a work order... causes the record to inherit the work type's duration values and required skills and products." That inheritance mechanism only works because Work Order is directly associated with Work Type via that lookup.

**Why A is wrong.** There's no field or relationship connecting Service Resource to Work Type in the Field Service data model — Service Resource's fields (Location, Resource Type, Service Crew, and so on) contain nothing that references Work Type. Matching a resource to a job happens indirectly, through Skill Requirements and the Match Skills work rule comparing the resource's own assigned Skills against what the Work Type/Work Order requires — not through any direct Work Type–to–Resource link.`,
      sources:[
        {l:"SkillRequirement — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_skillrequirement.htm"},
        {l:"Service Appointment Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_appointment_fields.htm&type=5"},
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Sharing & Territories",
      select:1,
      prompt:"Which object can be used to share Service Appointments with Service Resources in Salesforce Field Service?",
      options:[
        {k:"A", t:"User Territory"},
        {k:"B", t:"Work Order"},
        {k:"C", t:"Service Territory Member"},
        {k:"D", t:"Service Territory"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** A Salesforce Help knowledge article on this exact mechanism states it directly: "The Service Territory Member record determines how a Service Appointment is shared with a Service Resource." The managed-package territory sharing solution works by checking, at the moment a Service Appointment is scheduled to a Service Resource, whether there's an active Service Territory Member record (Primary or Relocation) whose effective window covers the appointment's scheduled time. If one matches, the appointment is shared with that Service Territory; if not, it falls back to a default public group. Because that membership record is what actually gets evaluated and drives the sharing decision, Service Territory Member is the object a Consultant configures to control this.

**Why A is wrong.** User Territory is the related-but-distinct mechanism for a different persona: it grants an internal user like a dispatcher or call center rep access to all records associated with a territory (via the territory's public group), based on that user being added to the User Territory record. It governs dispatcher/coordinator visibility into territory data broadly — it isn't the record Salesforce's sharing engine evaluates specifically to decide whether a given Service Appointment is shared with the Service Resource it's scheduled to.

**Why B is wrong.** Work Order is the parent job record describing the work to be done — it carries no territory or resource-membership information and plays no role in the sharing evaluation. It's the object being worked on, not a mechanism for granting access to it.

**Why D is wrong.** Service Territory is the territory definition itself (the "where") — it's the object records get shared *to* (via its associated public group), but it isn't the join record whose active window Salesforce actually checks to decide *whether* a given appointment gets shared with a given resource. That evaluation happens against the resource's own Service Territory Member record, not the Service Territory record in isolation.`,
      sources:[
        {l:"Service Appointment Is Shared With a Service Resource — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=002623432&language=en_US&type=1"},
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_sharing.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Work Types",
      select:1,
      prompt:"Approximately 70% of A Company site visits are inspections and quotation sessions that take roughly the same amount of time and set of resource skills to complete. What should a Consultant recommend to streamline the creation of these Work Orders?",
      options:[
        {k:"A", t:"Create Work Types for use on Work Orders."},
        {k:"B", t:"Create a work flow to clone the Work Order."},
        {k:"C", t:"Create a standard set of work Order Line Items."},
        {k:"D", t:"Create a child Work Order for each similar site visit."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** This is exactly the scenario Work Types are built for: Salesforce describes them as templates that exist "to standardize your field service work." A Work Type predefines an Estimated Duration and Required Skills once, and when applied to a new Work Order it "inherits settings from the work type" automatically. Since 70% of the site visits here are two well-defined, repeatable job categories — inspections and quotation sessions — with a consistent duration and skill profile, creating a Work Type for each lets the team pick the right template at Work Order creation and get the correct duration and skill requirements populated instantly, every time, with no manual re-entry.

**Why B is wrong.** Building a custom workflow/automation to clone a Work Order is unnecessary custom development for a problem Salesforce already solves natively with Work Types. Cloning also just duplicates whatever data was on the source record rather than applying a maintained, centrally-updatable template — if the standard duration or required skill ever changes, a clone-based approach means hunting down and fixing every future clone's source, whereas a Work Type only needs to be updated once.

**Why C is wrong.** A standard set of Work Order Line Items addresses the tasks/parts within a job, not the Work Order-level attributes the scenario actually cares about — the consistent duration and skill set needed to complete the visit. Line Items don't carry Estimated Duration or Required Skills at the Work Order level, so this doesn't solve the stated problem of streamlining creation with consistent time and skill expectations.

**Why D is wrong.** Child Work Orders are for splitting a single job into multiple linked sub-jobs (or tracking multiple visits under one parent) — an entirely different concept from standardizing the creation of many separate, similar Work Orders across different customer site visits. It doesn't provide any templating or default-population mechanism at all.`,
      sources:[
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:2,
      prompt:"To prepare an upgrade, a mobile technician creates a product request for three circuit boards to be sent from the main warehouse to the customer site. The completed job needs two of the boards. Which two Field Service tools should the technician use to return the unused circuit board to the warehouse?",
      options:[
        {k:"A", t:"Work Order"},
        {k:"B", t:"Return Order"},
        {k:"C", t:"Product Receipt"},
        {k:"D", t:"Product Transfer"}
      ],
      correct:["B","D"],
      explanation:
`**Why B is right.** Salesforce's own documentation on Return Orders describes this exact scenario: "If a mobile worker is returning an unused item, select the related product request that the product was intended to fulfill." That's precisely this job — a Product Request was created for three boards, the job only needed two, and the leftover board needs to go back. Return Order (with its Return Order Line Items) is the object built specifically to record that kind of return, including the return reason and where the item is headed.

**Why D is right.** Salesforce's documentation on Product Transfers states they "track the movement of inventory from one field service location to another," and confirms mobile workers can create and update them directly in the Field Service mobile app. A technician's van and the main warehouse are both field service locations, so physically moving the unused board from the technician back into warehouse stock — and having the Product Item quantities at each location update automatically — is exactly what a Product Transfer is for.

**Why A is wrong.** Work Order is the parent job record describing the work to be performed — it has no inventory-movement mechanics of its own. It's the record the whole scenario happens around, not a tool for returning unused parts.

**Why C is wrong.** "Product Receipt" isn't a real object anywhere in Salesforce — not just in Field Service. A full sweep of Salesforce's complete standard-objects index turns up zero objects containing the word "Receipt" at all, and two separate official Field Service inventory guides ("Common Field Service Inventory Management Tasks" and "Set Up Your Field Service Inventory") each enumerate every inventory tool in the product (Product Item, Product Item Transaction, Product Request, Product Request Line Item, Product Transfer, Shipment, Return Order, Return Order Line Item, Inventory Location, Serialized Products, Product Service Campaign) without ever mentioning it. Tellingly, the actual mechanism for confirming inbound inventory has arrived is to "mark the product transfer received" — a status change on the existing Product Transfer record — not a separate "Product Receipt" object or action.`,
      sources:[
        {l:"Track Customer Returns in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_return_orders.htm&language=en_US&type=5"},
        {l:"Transfer Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_product_transfers.htm&language=en_US&type=5"},
        {l:"Field Service Inventory Management Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm"},
        {l:"Common Field Service Inventory Management Tasks — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_parts_guidelines.htm&language=en_US&type=5"},
        {l:"Set Up Your Field Service Inventory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_set_up_parts.htm&language=en_US&type=5"},
        {l:"Standard Objects — Object Reference for the Salesforce Platform", u:"https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_list.htm"}
      ]
    },
    {
      topic:"Status Transitions & Pinning",
      select:2,
      prompt:"A Company schedules jobs that require multiple steps when on-site. A Company wants to add a new status to the existing status flow. Which two configurations should the Consultant set up to meet this requirement? (Select all that apply)",
      options:[
        {k:"A", t:"Add the Status Transitions to the Technicians' Profile."},
        {k:"B", t:"Add new Status to Status Transitions."},
        {k:"C", t:"Add new Status to the Case."},
        {k:"D", t:"Add new Status to the Service Appointment."}
      ],
      correct:["B","D"],
      explanation:
`**Why D is right.** Salesforce's own documentation on customizing the Field Service appointment life cycle lays out the process directly: the first step is to open Field Service Settings → Service Appointment Workflow → SA Status, and "edit the Status picklist values in Setup to add your custom status name." A multi-step on-site job (for example, needing an intermediate status like "Paused" or "Awaiting Parts" between the standard statuses) requires that new value to exist on the Service Appointment's own Status picklist before it can be used anywhere in the flow.

**Why B is right.** Adding the picklist value alone isn't enough — the same documentation's next step is to return to the Status Transitions configuration and "add new transition rows to define which statuses your custom status can transition to and from." Without a defined transition, the new status would exist as a value but have no valid path into or out of it in the appointment lifecycle, so both the new value (D) and its transition rules (B) are required together to make the new status actually usable.

**Why A is wrong.** Status Transitions are scoped to user Profiles as an optional *restriction* (limiting which Profiles can execute a specific transition) — but that's a permissions control layered on top of an already-defined transition, not the mechanism for creating a brand-new status in the first place. Adding something to "the Technicians' Profile" isn't part of the documented process for introducing a new status at all.

**Why C is wrong.** Case Status is a separate, unrelated picklist on the Case object used for support-ticket triage — it has nothing to do with Service Appointment's on-site job status flow. The scenario is about tracking multi-step progress on a scheduled field job, which lives entirely on the Service Appointment object, not the Case.`,
      sources:[
        {l:"Customize the Field Service Appointment Life Cycle — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_lifecycle.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling Policies",
      select:1,
      prompt:"A Dispatcher needs to reduce the backlog of Service Appointments in different territories and focus on individual customer service preferences. Which Scheduling Policy should the Dispatcher use?",
      options:[
        {k:"A", t:"High Intensity"},
        {k:"B", t:"Emergency"},
        {k:"C", t:"Soft Boundaries"},
        {k:"D", t:"Customer First"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own documentation defines Soft Boundaries as "Identical to the Customer First policy, but allows the sharing of employees between territories to enhance service coverage." That's a direct match for both parts of the requirement at once: it inherits Customer First's preference-driven grading (so individual customer service preferences are still honored), while adding the one capability Customer First lacks — letting technicians work across territory lines so a backlog piling up in one territory can be worked by available resources from a neighboring one. It's purpose-built to be "Customer First, plus the ability to clear backlogs across territories."

**Why D is wrong.** Customer First is described as balancing "great customer service with travel minimization," grading appointments "first by the customer's selection of a preferred employee and then by the ability to schedule the appointment as soon as possible" — it fully covers the customer-preference half of the requirement, but it operates within each resource's normal territory. It has no built-in mechanism for sharing resources across territories, so on its own it can't address a backlog specifically described as spanning "different territories."

**Why A is wrong.** Salesforce's documentation is explicit that High Intensity is "typically used in times of high service volumes, like a storm scenario, where your need for employee productivity is higher priority than customer preferences." That's the opposite of what's being asked for here — it's built to clear volume fast precisely by *deprioritizing* individual customer preferences, not by honoring them.

**Why B is wrong.** Emergency is "used with the Emergency Chatter action to dispatch emergency service appointments" — a policy for single urgent, ad hoc dispatches triggered through a specific action, not a general-purpose policy for managing an ongoing appointment backlog across multiple territories while still respecting customer preferences.`,
      sources:[
        {l:"Create and Manage Field Service Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=pfs_scheduling.htm&type=0"}
      ]
    },
    {
      topic:"Dispatching",
      select:1,
      prompt:"A Company normally focuses on minimizing travel. Weather can cause situations that require expedited on-site service. How should a Consultant recommend A Company handle unplanned service during times of severe weather?",
      options:[
        {k:"A", t:"Configure an Emergence Policy and use the Emergency Wizard."},
        {k:"B", t:"Manually flag Service Appointments as \"In Jeopardy\" due to weather."},
        {k:"C", t:"Postpone all lower-priority jobs and extend Due Dates."},
        {k:"D", t:"Configure a new Service Level for immediate assignment."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** This is exactly the documented, purpose-built path for expedited, unplanned dispatch. Salesforce Help describes the Emergency Chatter action directly: it "shows a map view of your closest field resources so that you can dispatch work immediately," letting a dispatcher pick a work type, territory, and address, generate a ranked list of candidates by ETA, and dispatch on the spot — a completely different, faster mechanism than the company's everyday travel-minimizing scheduling policy. And the settings behind that action (which scheduling policy it uses, location-validity timeframes, availability grading) are configured through exactly the tool named in this option: in the Field Service Admin app under Global Actions, there's a dedicated **Emergency Wizard** for setting this up. Configuring an Emergency Policy and using the Emergency Wizard is the standard way to let day-to-day travel-minimization stay the default while still having a fast, documented lane for weather-driven, urgent work.

**Why B is wrong.** The "In Jeopardy" field is a status flag indicating an appointment is at risk of missing its committed time — it's a warning indicator, not a dispatch mechanism. Manually flagging appointments doesn't get anyone assigned faster or find the closest available resource; it just labels the problem without solving it.

**Why C is wrong.** Blanket-postponing every lower-priority job and pushing out Due Dates is a manual, reactive workaround with no targeting — it doesn't identify which resources are actually closest or available for the urgent weather-driven work, and it needlessly delays jobs that may have nothing to do with the emergency. It also isn't a documented Field Service feature; it's just an operational stopgap.

**Why D is wrong.** "Service Level" in Salesforce is associated with Entitlements and SLA terms (coverage windows, response-time commitments) — it governs what a customer is contractually owed, not a real-time mechanism for finding and dispatching the nearest available technician during a live weather event. It doesn't match the documented Emergency dispatch capability at all.`,
      sources:[
        {l:"Schedule Emergency Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_emergency.htm&language=en_US&type=5"},
        {l:"Create and Manage Field Service Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=pfs_scheduling.htm&type=0"}
      ]
    },
    {
      topic:"Products & Pricing",
      select:1,
      prompt:"A Company has customers who have previously negotiated pricing on some products. Which Price Book structure should a Consultant recommend when considering the implications of pricing on Work Orders?",
      options:[
        {k:"A", t:"Utilize a Custom Global Price Book and add price-negotiated products as Price Book Entries."},
        {k:"B", t:"Create customer-specific Price Books and add all products as Price Book Entries."},
        {k:"C", t:"Create customer-specific Price Books and add only price-negotiated products as Price Book Entries."},
        {k:"D", t:"Utilize a custom Global Price Book and add all products as Price Book Entries."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The key implication the question is pointing at is the "one Price Book per record" constraint: a Work Order (like an Opportunity or Quote) links to exactly one Price Book at a time, and every Work Order Line Item on it can only pull a price from that single selected Price Book's entries. A dedicated Salesforce Price Book best-practices guide spells out exactly why that forces the customer-specific book to be comprehensive: "as soon as sales reps create a new Opportunity, they should select an appropriate Price Book to add all necessary products" — if that book were missing anything, the rep (or here, the technician building a Work Order) "couldn't add standard-priced products through that price book" and would face "workflow confusion" needing to switch Price Books mid-record, which isn't how the platform works. So a customer-specific Price Book has to carry every product — the negotiated items at their special price, and everything else at standard price — so the customer's Work Orders can be fully priced from that one book alone.

**Why A is wrong.** A Global Price Book is meant to serve as the default/fallback used broadly, including for every customer who has *not* negotiated special pricing. If it only contained the price-negotiated products, none of the standard, non-negotiated products would be priceable for the majority of customers who don't have special deals — that's a much bigger population than the ones this option is trying to serve.

**Why C is wrong.** This runs directly into the single-Price-Book-per-record limitation described above. If a customer's dedicated Price Book contains only their negotiated items, then the moment their Work Order needs any other, non-negotiated product, there's no PricebookEntry for it in that book at all — and since only one Price Book can be attached to the Work Order, that product simply can't be priced or added, forcing an awkward mid-record Price Book swap the platform doesn't support well.

**Why D is wrong.** A single custom Global Price Book, even with every product loaded into it, still assigns the same price to every customer who uses it. It has no way to reflect the special negotiated pricing certain customers were promised — everyone referencing that one Global book would see identical prices, defeating the entire purpose of having negotiated terms in the first place.`,
      sources:[
        {l:"Salesforce Price Books: Best Practices for Effective Sales — ScienceSoft", u:"https://www.scnsoft.com/blog/salesforce-price-books"},
        {l:"Field Service Pricing Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_pricing.htm"}
      ]
    },
    {
      topic:"Crew Management",
      select:1,
      prompt:"A Company needs to sent technicians into the field to service containers. It takes two technicians with specialized skills to complete the work at the same time. How should the consultant meet this requirement?",
      options:[
        {k:"A", t:"Create a work rule with two required skills"},
        {k:"B", t:"Create a two-service crew"},
        {k:"C", t:"Create a crew with two technicians"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** This is the documented, purpose-built use case for Service Crews. Salesforce Help defines one directly: "a service crew is a group of service resources whose combined skills and experience make them a good fit to work together on appointments," giving the example of "a wellhead repair crew" combining a hydrologist, a mechanical engineer, and an electrician — different specialists working the same job at the same time. The structure matches exactly: create one Service Resource of type Crew, add the two specialized technicians as its Service Crew Members, and the crew (not the individuals separately) gets assigned and dispatched to the Service Appointment as a single unit — guaranteeing both people with their respective skills show up together for the job.

**Why A is wrong.** A work rule with two required skills only checks whether a *single* assigned resource possesses both skills — it doesn't, and can't, guarantee that two separate people are physically on-site working together at the same time. Skill Requirements validate one candidate resource's qualifications; they have no mechanism for co-scheduling two distinct technicians onto the same appointment simultaneously. If the two specialties genuinely need two different people (not one cross-trained person), a Skill Requirement alone can't produce that outcome.

**Why B is wrong.** This option's wording doesn't describe the correct configuration — "a two-service crew" reads as creating a separate, second crew rather than combining the two specialized technicians into the one shared crew the job actually needs. Splitting the two technicians into two different crew records wouldn't dispatch them together as a single unit to the same appointment, which is the whole point of the requirement (both specialists present, at the same time, on the same job).`,
      sources:[
        {l:"Create Service Crews for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_crews.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:1,
      prompt:"At A Company, the Service Territory Member's time zone is one hour behind the Service Territory's time zone. How should the Consultant ensure proper scheduling and optimization for the member?",
      options:[
        {k:"A", t:"Subtract one hour from the start and end times on the Service Territory."},
        {k:"B", t:"Change the time zone on the Service Territory Member's user record to match the Service Territory's time zone."},
        {k:"C", t:"Add one hour to the start and end times on the Service Territory Member's Operating Hours."},
        {k:"D", t:"Add on hour to the start and end times on the Service Territory."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own documentation on time zones in Field Service establishes the core architecture: scheduling always interprets Operating Hours values using the Service Territory's own time zone, not any other time zone setting — "Field Service doesn't consider the time zone defined on the [Operating Hours] record. Instead, it uses the time zone of the service appointment's service territory's operating hours." That means whatever raw numbers a Consultant enters on the member's Operating Hours get read as if they were already in the territory's time zone, regardless of where that member physically is. Since the member's real local time zone is one hour *behind* the territory's, their true local "9am" is actually "10am" in the territory's time zone — so to make the system correctly reflect when they're really available, the Consultant must add one hour to the start and end times entered on that member's own Service Territory Member Operating Hours record. This is also the documented mechanism for member-specific scheduling exceptions in the first place: Salesforce Help notes that when a member's availability differs from the territory's default, you "update the Operating Hours field on a service territory member record" — exactly the record this option targets.

**Why A is wrong.** Adjusting the Service Territory's own hours would change the schedule for every resource in that territory, not just the one member with a personal time zone offset — a company-wide change to fix an individual's mismatch. It also doesn't address the actual mechanism: the territory's time zone itself isn't wrong, only this one member's entered hours need to be translated into it.

**Why B is wrong.** A User's personal Time Zone field is a display-only setting — Salesforce's documentation confirms "service resources see times converted to their user's time zone" for viewing purposes, but the underlying scheduling and optimization calculations still run against the Service Territory's time zone regardless of what a user's personal field says. Changing this field wouldn't correct the actual availability-window mismatch the optimizer works with; it only affects how times are displayed to that user.

**Why D is wrong.** Like A, this modifies the Service Territory itself rather than the individual member's record, applying a blanket change that would incorrectly shift the working hours of every other resource in that territory who doesn't have this particular time zone offset.`,
      sources:[
        {l:"Time Zones and Appointment Booking — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_time_zones.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:2,
      prompt:"Technicians at A Company use the Salesforce Field Service Mobile App at customer sites. After completing work, the Technician updates the Service Appointment Complete and saves the record. Dispatchers see the appointment as Dispatched on the Console instead of seeing the Complete status update. Which two troubleshooting steps should a Consultant take to resolve the issue?",
      options:[
        {k:"A", t:"Review Service Appointment automation."},
        {k:"B", t:"Investigate the Work Order lifecycle."},
        {k:"C", t:"Verify the Dispatcher ran the Service Appointment data job."},
        {k:"D", t:"Confirm the Technician's mobile device is online."}
      ],
      correct:["A","D"],
      explanation:
`**Why D is right.** Salesforce's own documentation on offline behavior in the mobile app confirms exactly this failure mode: "when you create [or update] an object offline, it doesn't display fully until your device syncs with the server." A save made while the device has no connectivity is cached locally and queued — it looks completed on the technician's screen, but the server (and therefore the Dispatcher Console, which reads from the server) has no idea the change happened until the device reconnects and syncs. Checking connectivity is the first, most direct explanation for the console showing a stale "Dispatched" status after a completed save.

**Why A is right.** The other realistic cause is server-side: a Flow, Process Builder process, or Apex trigger firing on the Service Appointment could be silently overwriting or reverting the Status field back to "Dispatched" immediately after the technician's update lands (for example, automation designed for a different transition that unintentionally fires here too). Reviewing existing Service Appointment automation is standard practice when a status change appears to "take" on save but doesn't stick — the record briefly reflects the new value before something else resets it.

**Why B is wrong.** Work Order lifecycle status is tracked on a separate parent object with its own status flow — it doesn't drive or explain what's displayed for the Service Appointment's own Status field on the Dispatcher Console. Investigating it wouldn't surface the cause of a Service-Appointment-specific display mismatch.

**Why C is wrong.** There's no standard Salesforce feature called a "Service Appointment data job" that a Dispatcher runs to sync statuses — appointment updates flow to the server automatically as part of standard save/sync behavior, not through a manual job a dispatcher triggers. This option describes a nonexistent mechanism.`,
      sources:[
        {l:"Offline Considerations in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_offline_considerations.htm&type=5"},
        {l:"Salesforce Field Service (SFS) Mobile App — Data Sync Stuck or Not Completing — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000393708&language=en_US&type=1"}
      ]
    },
    {
      topic:"Entitlements & Milestones",
      select:3,
      prompt:"A Company wants to implement Service Level Agreements (SLA) for Work Orders. Which three considerations should the Consultant take into account?",
      options:[
        {k:"A", t:"Milestones for Work Orders can be set up from the metadata API."},
        {k:"B", t:"A new Entitlement Process requires selecting a single Entitlement Process Type."},
        {k:"C", t:"An Entitlement Process must be applied to both Cases and Work Orders."},
        {k:"D", t:"Milestones for Work Orders can be configured in Setup."}
      ],
      correct:["A","B","D"],
      explanation:
`**Why B is right.** Salesforce's own entitlement management material is explicit that a process is scoped to one object type: "Entitlement processes only run on records that match their type — so you can't use the same entitlement process for cases and work orders." Creating a new Entitlement Process forces a single Entitlement Process Type selection (Case, Work Order, or Work Order Line Item).

**Why D is right.** Milestones are configured declaratively — created and attached to an Entitlement Process through Setup (the Entitlement Process's Milestones related list), with no code required for a standard SLA build.

**Why A is right.** EntitlementProcess and MilestoneType are both real, documented Metadata API types, and their definitions explicitly cover milestones on Work Orders as well as Cases — so Work Order milestones can also be created and deployed via the Metadata API (typically for moving configuration between orgs), alongside the Setup UI path.

**Why C is wrong.** This is the direct opposite of how entitlement processes work: a single process can be applied to Cases *or* Work Orders (or Work Order Line Items), never both at once. Standardizing SLAs across both Cases and Work Orders means building two separate Entitlement Processes, not one process serving both.`,
      sources:[
        {l:"Use Entitlements with Work Orders — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders"},
        {l:"Complete Guide to Salesforce Entitlements and Milestones in Service Cloud — Salesforce Ben", u:"https://www.salesforceben.com/complete-guide-to-salesforce-entitlements-and-milestones-in-service-cloud/"},
        {l:"EntitlementProcess — Metadata API Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_entitlementprocess.htm"}
      ]
    },
    {
      topic:"Resource Absences",
      select:2,
      prompt:"A Company's Technicians have 12 mandatory holidays each Calendar Year. Technicians need to view all of their absence records at once. Which two applications should a Consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Salesforce Mobile Application"},
        {k:"B", t:"Salesforce Field Service Mobile Application"},
        {k:"C", t:"Salesforce browser-based Application"},
        {k:"D", t:"Custom Mobile Application"}
      ],
      correct:["A","C"],
      explanation:
`**Why A and C are right.** Resource Absence is a standard record, and both the standard Salesforce Mobile App and Lightning Experience in a browser expose it through ordinary list views (for example, off the Service Resource or Resource Absence object) with no artificial limit on how far back or forward those records go — a technician can pull up all 12 holidays for the year in one unconstrained screen, in either app.

**Why B is wrong.** The Field Service mobile app's Absences card is explicitly date-range limited — Salesforce's documentation states visibility there is "limited to the date range specified in Field Service Mobile Settings." It's built to show what's blocking the technician's near-term schedule, not to browse a full year of absence history in one view.

**Why D is wrong.** Unnecessary custom development — two out-of-the-box Salesforce surfaces already handle unrestricted absence viewing, so there's no gap here to fill with a bespoke app.`,
      sources:[
        {l:"Create Resource Absences in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_resource_absence.htm&language=en_US&type=5"},
        {l:"Create Service Resource Absences for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5"}
      ]
    },
    {
      topic:"Dispatching",
      select:1,
      prompt:"A Company wants to automatically dispatch a Technician's next two Service Appointments after the Technician completes their current Service Appointment. A Company wants to be consistent across all of the Service Territories and control the number of Service Appointments that are pushed to the Technician. What automated processing should the Consultant configure upon Work Order completion to dispatch the next two Appointments?",
      options:[
        {k:"A", t:"Build a Workflow Rule."},
        {k:"B", t:"Enable Drip feed Dispatch."},
        {k:"C", t:"Configure an Auto Dispatch Scheduled Job."},
        {k:"D", t:"Create an Apex Trigger."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Drip Feed is the purpose-built, declarative feature for exactly this scenario. Salesforce's documentation confirms it's event-driven, not timer-driven: "Drip feed is triggered to dispatch another appointment only if a Dispatched or In-Progress appointment in the queue is Canceled, Completed, or Cannot Complete" — meaning it fires precisely on Work Order/appointment completion. It also directly satisfies "control the number pushed": you set the queue depth (here, 2) in Field Service Settings under Dispatch → Drip Feed, configured org-wide so every territory inherits the same behavior by default — satisfying "consistent across all Service Territories" — with an optional per-territory override available only if a specific territory ever needs to diverge.

**Why C is wrong.** Auto-Dispatch is timer-driven, not completion-driven: it runs on a recurring schedule and moves eligible Scheduled appointments to Dispatched regardless of whether a technician just finished something. It has no concept of "release exactly two once the current appointment wraps up."

**Why A is wrong.** A Workflow Rule would mean building custom automation to replicate a capability Salesforce already ships natively and declaratively — unnecessary cost and long-term maintenance for something a Setup toggle already handles. Workflow Rules are also a legacy automation tool with no native way to track a rolling "keep N dispatched" queue.

**Why D is wrong.** Same issue as A: an Apex Trigger is custom code solving a problem that Drip Feed already solves out of the box, adding unnecessary build and support burden.`,
      sources:[
        {l:"Drip Feed Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatch_drip_feed.htm&language=en_US&type=5"},
        {l:"Automatically Dispatch Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatching_appointments.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Mobile Flows & Quick Actions",
      select:1,
      prompt:"A Company wants to ensure that Technicians enter required information only once when completing Work Orders on the Salesforce Field Service Mobile App. The information entered by Technicians needs to also update the Service Appointment and the Case that are associated to the Work Order. What should a Consultant leverage to ensure the right data is captured from Salesforce Field Service Mobile App?",
      options:[
        {k:"A", t:"Process Builder on Case to update the Service Appointment and Work Order."},
        {k:"B", t:"Quick Actions that launch a Flow on Cases, Work Orders and Service Appointments with required fields."},
        {k:"C", t:"Quick Action on the Work Order that launches a Flow to update the Work Order, Case, and Service Appointment."},
        {k:"D", t:"Lightning Component with required fields to update the Case, Work Order and Service Appointment."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** A single Quick Action on the Work Order — the record the technician is already working from to complete the job — can launch one Flow with one data-entry screen. Salesforce's own guidance on Flows in the Field Service mobile app confirms a mobile flow's record-update actions can touch multiple related objects in one run (it specifically discusses flow updates reaching Cases, down to warning about assignment-rule side effects on those updates). So the technician fills in the required fields exactly once, and the flow's own logic fans that data out to the Work Order, its Case, and its Service Appointment behind the scenes.

**Why B is wrong.** Putting separate Quick Actions on Cases, Work Orders, *and* Service Appointments means three separate entry points — either the technician re-enters the same data on each object's own action, or has to know which single one to use. That doesn't cleanly guarantee "only once"; one action driving one flow does.

**Why A is wrong.** Process Builder is legacy, record-triggered automation — it reacts after a Case is saved, but it has no user-facing data-capture screen, so it can't be the mechanism that lets a technician *enter* information on the mobile app in the first place.

**Why D is wrong.** A custom Lightning Component would require bespoke development to do something a native Quick-Action-plus-Flow (clicks, not code) already handles — unnecessary build and maintenance cost for a declarative solution that already exists.`,
      sources:[
        {l:"Considerations for Using Flows in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.mfs_flow_considerations.htm&type=5"},
        {l:"Create Quick Actions for the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_quick_actions.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Asset Lifecycle",
      select:1,
      prompt:"A Company has implemented a Flow that allows Technicians to replace faulty or damaged Assets directly from within the Salesforce Field Service Mobile App. Once a replacement has been made, where can the Asset Relationships be viewed?",
      options:[
        {k:"A", t:"Only the Primary Assets related list on the Work Order Object"},
        {k:"B", t:"Both the Primary Assets and Related Assets related lists on the Work Order object"},
        {k:"C", t:"Both the Primary Assets and Related Assets related lists on the Asset Object"},
        {k:"D", t:"Only the Primary assets related list on the Asset object"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own documentation is explicit: "Relationships appear in the Primary Assets and Related Assets related lists on asset records." Both related lists live on the Asset object's page, not the Work Order. Primary Assets shows assets that replaced the current asset; Related Assets shows assets the current asset replaced. So once the flow swaps a faulty Asset for a new one, the resulting AssetRelationship record surfaces on both the old and new Asset's detail pages through these two related lists.

**Why A and B are wrong.** Both misplace the related lists on the Work Order object — Work Orders track the service job itself, not asset-to-asset lineage, and have no Primary Assets/Related Assets related lists at all.

**Why D is wrong.** It names only one of the two related lists. Seeing the relationship from both directions — what replaced this asset, and what this asset replaced — requires both Primary Assets and Related Assets, not just one.`,
      sources:[
        {l:"Track Customer Assets Effectively in Salesforce — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets"},
        {l:"Asset Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.assets_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Mobile Screens & Layouts",
      select:1,
      prompt:"A Company wants to limit their Technicians' view of Work Orders and Service Appointments in the Salesforce Field Service Mobile App. What should a Consultant recommend to control their Technicians' view?",
      options:[
        {k:"A", t:"Page Layouts"},
        {k:"B", t:"Mini-Page Layouts"},
        {k:"C", t:"Visualforce Pages"},
        {k:"D", t:"Field Sets"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's own documentation on customizing the mobile app screens is direct: "Control which fields users see in the Field Service mobile app by updating page and search layouts." What a technician sees for a Work Order or Service Appointment — the fields on the overview screen, the title and preview fields on list cards — is driven by that record type's Page Layout (plus its related Compact and Search Layouts), configured through standard Object Manager setup.

**Why B is wrong.** Mini-Page Layouts are a real Salesforce feature, but they belong to the classic Salesforce Console (Agent Console) — controlling the compact list/detail view in that older console interface. They have nothing to do with the Field Service mobile app.

**Why C is wrong.** Visualforce is legacy page technology; the native Field Service mobile app is Lightning-based and doesn't read its record screens from Visualforce pages.

**Why D is wrong.** Field Sets control which fields are exposed to custom UI or API consumers (a custom Visualforce/LWC component, an integration) — they don't drive what's rendered on the mobile app's native record screens. That's the layout's job, not a field set's.`,
      sources:[
        {l:"Customize Screens in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_layouts_page.htm&language=en_US&type=5"},
        {l:"Customize the Layout of the Work Order Overview Screen — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_work_order_overview.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"Each container consists of multiple parts that are tracked by Asset records. A Company's customers usually wait until several parts need service before requesting a Technician come on-site to save money on service charges. How should a Consultant configure Salesforce Field Service to track the work performed?",
      options:[
        {k:"A", t:"Create a Work Order for all Assets being serviced and a Work Order Line Item for each Product Consumed."},
        {k:"B", t:"Create a Work Type and Work Order for each Asset being serviced."},
        {k:"C", t:"Create a Work Type to automatically create relevant line items for each Asset."},
        {k:"D", t:"Create a Work Order and Work Order Line Item for each Asset being serviced."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** A Work Order Line Item's Asset field isn't inherited from its parent Work Order — Salesforce's developer documentation is explicit: "The asset is not automatically inherited from the parent work order." That means each line item can be independently tied to a different Asset. So the right structure for "several parts need service in one visit" is a single Work Order representing that one on-site visit, with one Work Order Line Item created underneath it for each specific Asset (part) being serviced — a clear per-part checklist while keeping the whole visit as one cohesive job with one Service Appointment.

**Why A is wrong.** It ties line items to Products Consumed instead of Assets — Products Consumed tracks parts/inventory used during the job, a separate concept from which Asset the work applies to. Conflating the two loses the actual per-asset tracking the scenario needs.

**Why B is wrong.** Creating a separate Work Order per Asset defeats the point of the scenario — the customer is deliberately bundling multiple parts into a single on-site visit to save on service charges, and splitting that into multiple Work Orders re-fragments it back into effectively separate jobs/visits.

**Why C is wrong.** A Work Type is a static, reusable template with a fixed, predefined set of line items — it has no way to dynamically know which specific Assets need service on a given occurrence, since that varies visit to visit.`,
      sources:[
        {l:"WorkOrderLineItem — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderlineitem.htm"},
        {l:"Generate Work Orders for Efficient Service Management — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A Company's Dispatchers want to visualize the planned travel route for a Technician during their shift. Which feature should the Consultant recommend to meet the requirement?",
      options:[
        {k:"A", t:"Street-level Routing"},
        {k:"B", t:"Aerial Routing"},
        {k:"C", t:"Service Appointment Reports"},
        {k:"D", t:"Service Resource Dashboard"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's own documentation on viewing a resource's daily travel route on the Dispatcher Console map is direct about the prerequisite: "To view travel routes, enable street-level routing." Once enabled, the map displays the planned Route in blue (and the Actual Route the technician drove, in pink, tracked via the mobile app) — exactly the visualized planned-travel-route view the requirement asks for.

**Why B is wrong.** Aerial routing calculates travel time using straight-line ("as the crow flies") distance between points rather than real road paths, so it can't produce a realistic visual route a technician would actually drive. Salesforce's own comparison notes Street-Level Routing is "much more realistic and accurate" precisely because it's based on the actual road network.

**Why C and D are wrong.** Service Appointment Reports and a Service Resource Dashboard are both tabular/chart-based reporting tools — neither renders a map-based travel path at all.`,
      sources:[
        {l:"View a Field Service Resource's Daily Travel Route — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_travel_routes.htm&language=en_US&type=5"},
        {l:"Street-Level Routing — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_streetlevelrouting.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company wants to track the time a Service Resource spends on each step of more complex repair jobs. This time could include travel, prep and on-site time. How could the Service Resource's Time Sheet be configured to track the total time spent on each step?",
      options:[
        {k:"A", t:"Relate the Time Sheet to the Service Appointment."},
        {k:"B", t:"Relate the Time Sheet to the Work Order Line Item."},
        {k:"C", t:"Relate the Time Sheet Entries to the Service Appointment."},
        {k:"D", t:"Relate the Time Sheet Entries to the Work Order Line Item."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** The Salesforce data model settles this directly: the Time Sheet object relates a Service Resource to a coverage period (start/end date) — it's the container for a whole shift or pay period, not tied to any single job. The granular tracking happens on Time Sheet Entry, which carries both a Work Order field and a Work Order Line Item field. Since a complex repair job's individual steps (travel, prep, on-site work) are represented as separate Work Order Line Items — the documented mechanism for breaking a job into more granular tasks — relating each Time Sheet Entry to the specific Work Order Line Item for that step is exactly how you'd capture total time spent per step.

**Why A and C are wrong.** Service Appointment isn't a supported related-record field on either the Time Sheet or Time Sheet Entry object — there's no ServiceAppointmentId lookup in the data model at all, so neither can be configured to relate to it.

**Why B is wrong.** It relates the wrong record: the parent Time Sheet is a resource-and-period container that can span many jobs across a shift — pinning it to one Work Order Line Item would misrepresent that scope. It's the entries within it, not the sheet itself, that need to carry the per-step link.`,
      sources:[
        {l:"TimeSheetEntry — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_timesheetentry.htm"},
        {l:"Time Sheet Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_timesheets_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Mobile Screens & Layouts",
      select:1,
      prompt:"Which configuration should a Company use to brand the Salesforce Field Service Mobile App?",
      options:[
        {k:"A", t:"Company Style Sheets"},
        {k:"B", t:"Company Logo"},
        {k:"C", t:"Company Address"},
        {k:"D", t:"Company Colors"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own documentation on branding the Field Service Mobile App points to a "Branding Colors" section in Field Service Mobile Settings, where an admin sets hex color codes for tokens like Navbar Background Color, Primary Brand Color, and Secondary Brand Color: "Under Branding Colors, update the hex color code of each setting as needed." That's the actual, documented mechanism — of the four options given, Company Colors is the one that matches it.

**Why B is wrong.** It's the natural-sounding but incorrect option — the Salesforce Trailblazer Community is explicit that logo upload isn't supported in the Field Service Mobile App, only color customization, despite some third-party training material claiming otherwise.

**Why A is wrong.** Branding is configured through simple hex-code fields in Setup, not by supplying custom CSS/style sheets.

**Why C is wrong.** Company Address is unrelated to visual branding entirely — it's business/location data, not a UI customization.`,
      sources:[
        {l:"Brand the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_branding.htm&language=en_US&type=5"},
        {l:"Can you add a Company Logo to the Field Service Mobile App? — Trailblazer Community", u:"https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000DcbiySAB"}
      ]
    },
    {
      topic:"Crew Management",
      select:1,
      prompt:"A Dispatcher notices that the Crew assigned to a Service Appointment is missing a skill for the work assigned. How can the Dispatcher update the Service Crew to meet those requirements?",
      options:[
        {k:"A", t:"Edit the Service Appointment and add a new Service Resource."},
        {k:"B", t:"Create a new Service Appointment with a different Crew."},
        {k:"C", t:"Update the Service Crew on the Service Appointment's Work Type."},
        {k:"D", t:"Use the Crew Management tool to add Service Resources to the Crew."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own documentation confirms this is a dedicated, purpose-built interface: "Field Service admins and dispatchers access...a service crew management tool where they can easily create service crews and update service crew membership." Adding a resource who holds the missing skill directly to the crew's membership fixes the gap at the source — the crew itself — rather than working around it for one appointment.

**Why A is wrong.** Editing the Service Appointment to add a new Service Resource bolts someone onto that single appointment rather than fixing the crew's actual skill roster — it doesn't correct the underlying gap for future scheduling.

**Why B is wrong.** Standing up an entirely new Service Appointment with a different crew is unnecessary rework that sidesteps the problem instead of solving it — the existing crew still lacks the skill for next time.

**Why C is wrong.** There's no "Service Crew" field on a Work Type to update — Work Types define default duration, skill requirements, and line items for a job, not crew composition. Crew membership lives on the Service Crew record itself, managed through Crew Management.`,
      sources:[
        {l:"Create Service Crews for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_crews.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company provides services to multiple machines installed at customer sites. Each machine has different issue that need to be fixed. A Company wants to track progress, different parts used, and time spent on each machine when dispatching a Technician. How should the Consultant meet these requirements?",
      options:[
        {k:"A", t:"Each Asset will have a Service Appointment that will represent the work need for each machine."},
        {k:"B", t:"Work Orders will have multiple Service Appointments. Each Service Appointment will be linked to the Asset."},
        {k:"C", t:"Each Account will have a Service Appointment that will represent the work to be done at the customer site."},
        {k:"D", t:"Work Orders will have multiple Work Order Line Items. Each Work Order Line Item will be linked to the Asset and have a Service Appointment."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own guidelines for creating Service Appointments are explicit: "Associate assets and accounts to the work order or work order line item through related fields and lists, instead of making assets and accounts the service appointment parent record." That places the Asset on the Work Order Line Item, not the Service Appointment. Once each machine has its own Work Order Line Item linked to its Asset, all three requirements fall into place: progress is tracked per line item (each has its own status), parts used are tracked per line item (Products Consumed relate to the Work Order Line Item), and time spent is tracked per line item too (Time Sheet Entry carries a Work Order Line Item lookup with no equivalent Service Appointment field). Layering a Service Appointment onto each line item (via "Auto-Create Service Appointment" on the Work Type) then gives the dispatcher a distinct, schedulable visit-unit per machine while keeping everything rolled up under one parent Work Order for the site visit.

**Why A and B are wrong.** Both wire the Service Appointment straight to the Asset — exactly the pattern Salesforce's guidance says to avoid. B also gives no home for per-machine parts or time tracking, since neither Products Consumed nor Time Sheet Entry relates to Service Appointment.

**Why C is wrong.** Anchoring the Service Appointment at the Account level is far too coarse — it represents the whole customer relationship's work, not any specific machine, losing all per-machine granularity.`,
      sources:[
        {l:"Guidelines for Creating Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/apex/HTViewHelpDoc?id=sf.fs_appointment_guidelines.htm&language=en_US"},
        {l:"Field Service Key Concepts and Glossary — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_key_concepts.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A Company occasionally needs to use two Technicians to complete a job, however the Technicians can be onsite at different times. How should a Consultant implement this process?",
      options:[
        {k:"A", t:"Create two Service Appointments and assign two different Resources."},
        {k:"B", t:"Create two Service Appointments and set the Early Start to the Start Time of the first Service Appointment."},
        {k:"C", t:"Create one Service Appointment and add two Required Resources."},
        {k:"D", t:"Create one Service Appointment and schedule two Resources."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Since the two technicians aren't working simultaneously, this is really two independent visits serving the same job, not a crew or same-appointment scenario. Salesforce's own guidance on Service Appointments supports exactly this pattern: "You can have multiple service appointments (visits) per work order, depending on the nature of the job." There's also a concrete technical reason to avoid stacking resources on one appointment: Salesforce documents that "If an appointment has more than one assigned resource, only the first created assigned resource is recognized in scheduling and in the Classic Dispatch Console" — a single Service Appointment can't reliably carry two independently-scheduled resources with two different time windows.

**Why C is wrong.** Required Resources is a mechanism for constraining or preserving who's eligible to be assigned to one appointment (e.g., protecting a one-on-one customer relationship) — it doesn't give two people two independent schedules on that one appointment.

**Why D is wrong.** Same technical limitation as above — putting two resources on one Service Appointment means only the first is actually recognized by the scheduling engine, so the second technician's distinct timing wouldn't be properly tracked or optimized.

**Why B is wrong.** It describes the right base structure (two appointments, two resources) but adds an unneeded constraint the scenario never asked for — pinning the second appointment's Early Start to the first's Start Time introduces a sequencing dependency that isn't part of the stated requirement, which is simply that the two technicians can be onsite at different, independently flexible times.`,
      sources:[
        {l:"Create Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_appointments.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Required Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_required_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:2,
      prompt:"Which two considerations impact the scheduled timeframe of Multi-day Work?",
      options:[
        {k:"A", t:"Assigned Resource"},
        {k:"B", t:"Break Duration"},
        {k:"C", t:"Resource Skill Level"},
        {k:"D", t:"Homebase Travel"}
      ],
      correct:["B","D"],
      explanation:
`**Why B and D are right.** Salesforce's documentation on multiday service appointments spells out the exact formula: "the time between the Scheduled Start and Scheduled End includes the duration of the job as well as travel time from and to the assigned resource's home base for each day of the appointment. The duration of any Break type Resource Absence records is also included if the Service Resource Availability work rule is set to create breaks." Beyond the job's own duration, the two variable considerations that stretch or shrink that timeframe are exactly these: Homebase Travel (the daily commute from and back to the resource's home base, controlled by the Travel From Home and Travel To Home fields on the Service Resource Availability work rule) and Break Duration (time added for any Break-type Resource Absence, when that work rule is configured to create breaks).

**Why A is wrong.** The resource's identity isn't itself a timeframe factor — what matters is that resource's home base location and availability, which is what Homebase Travel actually captures; "who" is assigned doesn't independently lengthen or shorten the schedule.

**Why C is wrong.** Skill level governs whether a resource is eligible to be matched to the job at all — it has nothing to do with how long the multiday window runs once someone's assigned.`,
      sources:[
        {l:"Enable Multiday Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_multiday.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company sells widgets with multiple components. Based on a problem reported by a customer, one or more of the components need to be replaced. What should a Consultant recommend to accurately record the required work?",
      options:[
        {k:"A", t:"Work Orders and Work Order Line Items"},
        {k:"B", t:"Work Orders with Service Appointments"},
        {k:"C", t:"Service Appointments and Service Appointment Line Items"},
        {k:"D", t:"Work Orders with Products consumed"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** A Work Order represents the overall job (the customer's reported issue), and each component that needs replacing gets its own Work Order Line Item — the documented mechanism for "more granular tasks" or sub-items within a job, each of which can independently link to the specific Asset/part being worked on. That gives an accurate, itemized record of exactly which components were replaced.

**Why C is wrong.** "Service Appointment Line Item" isn't a real Salesforce object at all — Salesforce's own standard Field Service object list has no such thing; Service Appointment exists, but nothing called a line item hangs off it.

**Why B is wrong.** Work Orders with Service Appointments alone gives you the overall job and its scheduled visit, but no itemized breakdown of which individual components were replaced — that granularity lives on line items, not appointments.

**Why D is wrong.** Products Consumed tracks the parts/inventory used during the job — a separate concept from a record of the work performed on each specific component. Conflating "what part was consumed" with "what work item needed doing" loses the actual task-level tracking the scenario calls for.`,
      sources:[
        {l:"Field Service Objects — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_standard_objects.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:2,
      prompt:"A Company wants to ensure that inventory needed for repair jobs is tracked and managed so Technicians have the material for their jobs. Which two ways should a Consultant recommend tracking these inventory requirements in Salesforce?",
      options:[
        {k:"A", t:"Products Required for Work Order Line Items"},
        {k:"B", t:"Products Required for Service Appointments"},
        {k:"C", t:"Products Required for Service Resources"},
        {k:"D", t:"Products Required for Work Orders"}
      ],
      correct:["A","D"],
      explanation:
`**Why A and D are right.** The ProductRequired object's parent lookup, ParentRecordId, is a polymorphic field whose own description is explicit: "The work order or work order line item that the product is required for." Work Order and Work Order Line Item are the two — and only two — record types Products Required can attach to for inventory planning, giving technicians a clear checklist of what they'll need before arriving at a job, at whichever level (the whole job or a specific sub-task) makes sense.

**Why B and C are wrong.** Neither Service Appointment nor Service Resource is a supported parent for ProductRequired at all — Service Appointment represents scheduling/visit details and Service Resource represents the technician/crew, and neither carries a Products Required related list in the Field Service data model.`,
      sources:[
        {l:"ProductRequired — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productrequired.htm"}
      ]
    },
    {
      topic:"Scheduling & Optimization",
      select:1,
      prompt:"A Company provides maintenance and emergency service to its customers. Sending Technicians to emergency calls during the day causes long travel times and reduces the number of appointments that a Technician can complete. Which feature should the Consultant use to reduce travel time and increase productivity?",
      options:[
        {k:"A", t:"Fill-in Schedule"},
        {k:"B", t:"Fix Overlaps"},
        {k:"C", t:"Resource Schedule Optimization"},
        {k:"D", t:"Reschedule Appointment"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** This is the documented use case, almost verbatim, in Salesforce's own Trailhead example: "A mobile worker's first job ran late, another one canceled, and a new high-priority job arrived." The recommended fix: "Select the mobile worker on the Gantt and choose Resource Schedule Optimization." RSO "optimizes one mobile worker's day," re-sequencing that technician's remaining appointments around the disruption to minimize travel and fit in as much work as the day allows — exactly the "reduce travel time and increase productivity" outcome the scenario asks for when an emergency call gets inserted mid-day.

**Why A and B are wrong.** "Fill-in Schedule" and "Fix Overlaps" aren't real, distinct Salesforce Field Service optimization features — neither is a documented capability in the scheduling toolset.

**Why D is wrong.** Reschedule Appointment is just a manual, one-at-a-time action to move a single appointment; it doesn't re-optimize the technician's whole remaining route the way RSO does, so it wouldn't systematically reduce travel across the rest of the day.`,
      sources:[
        {l:"Optimizing Daily Schedules for Mobile Workers — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/handle-inday-changes"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A Company Technicians frequently need to request more parts from another inventory location when stock runs low. How can A Company Technicians achieve this for each product requested?",
      options:[
        {k:"A", t:"Create a Shipment and Product Request Line Item."},
        {k:"B", t:"Create Work Order Line Item and a Product Request Line Item."},
        {k:"C", t:"Create a Product Request and a Product Request Line Item."},
        {k:"D", t:"Create a Product Consumed and a product Request Lien Item."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own object reference confirms the parent-child structure directly: "Product request line items are components of product requests." A Product Request is the header record for the overall parts request (destination location, shipping details, need-by date), and each individual product being requested gets its own Product Request Line Item underneath it — exactly the "for each product requested" granularity the scenario asks for.

**Why A is wrong.** A Shipment is a record of goods physically in transit, typically generated after a request has already been processed and approved — it isn't the object a technician creates to initiate the request itself, and Product Request Line Item's parent is Product Request, not Shipment.

**Why B is wrong.** A Work Order Line Item is a subtask on a job (installing a part, inspecting something), unrelated to the parts-requisition process — it has no relationship to Product Request Line Item at all.

**Why D is wrong.** Product Consumed records track parts already used up during completed work — the opposite of requesting new stock. It's a usage record, not a requisition mechanism.`,
      sources:[
        {l:"ProductRequestLineItem — Object Reference for the Salesforce Platform, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_productrequestlineitem.htm"},
        {l:"Request Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_part_requests.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company track installed Products using the Salesforce Asset object. Each individual solar panel is treated separately. To save money on service calls, many times customers will wait to have a technician come onsite until there are multiple panels that need servicing. How should the callout for multiple panels be treated in Salesforce?",
      options:[
        {k:"A", t:"Create a Work Order for each installed product and a Work Order Dependency to assign to the same resource."},
        {k:"B", t:"Create an Asset Hierarchy with each installed product as a Child Asset in the Hierarchy."},
        {k:"C", t:"Create a Work Order with a Work Order Lite Item for each installed Product."},
        {k:"D", t:"Create a Work Order hierarchy with each installed Product as a Child Work Order."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** A single Work Order represents the one on-site visit, and each solar panel (Asset) that needs servicing gets its own Work Order Line Item — since a line item's Asset field is independently settable per line item rather than inherited from the parent Work Order, this gives per-panel tracking of progress, parts used, and time spent, all while keeping the whole callout as one cohesive job with one Service Appointment.

**Why B is wrong.** An Asset Hierarchy (child assets under a parent) is a structural/physical modeling tool — it represents how assets relate to each other (e.g., a panel being part of an array), not how service work gets tracked or dispatched. Building a hierarchy does nothing to record or organize the actual technician callout.

**Why D is wrong.** A Work Order hierarchy with a separate child Work Order per panel is unnecessarily heavy — it fragments one visit into multiple full Work Order records when the lighter, purpose-built Work Order Line Item already handles per-asset granularity within a single job.

**Why A is wrong.** Same issue as D, plus a nonexistent mechanism: it splits the callout into multiple full Work Orders and invokes a "Work Order Dependency" concept that isn't a real, documented Salesforce Field Service feature — dependencies exist between Service Appointments (Same Day, Start After Finish, etc.), not as a "Work Order Dependency" construct.`,
      sources:[
        {l:"WorkOrderLineItem — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderlineitem.htm"}
      ]
    },
    {
      topic:"Maintenance Plans",
      select:2,
      prompt:"Which two scenarios are full supported by Maintenance Plans?",
      options:[
        {k:"A", t:"Site inspections during the first week of the year"},
        {k:"B", t:"Quarterly sales visits to a customer"},
        {k:"C", t:"Weekly recurring Appointments at 8:00 AM"},
        {k:"D", t:"Appointments on the first Tuesday of the month"}
      ],
      correct:["A","B"],
      explanation:
`**Why A and B are right.** Maintenance Plans generate recurring work on a pure date-interval model: Frequency + Frequency Type (Days, Weeks, Months, Years) advancing from a Start Date, with Generation Timeframe controlling how far ahead batches get created. A quarterly cadence (every 3 months) and an annual cadence anchored to a date in the first week of January both fall squarely into that simple offset arithmetic — Frequency Type = Months (3) for the quarterly visits, Frequency Type = Years (1) for the annual inspection — no special-case logic required.

**Why D is wrong.** Salesforce's own guidance is explicit that basic Maintenance Plan frequency "does not support scheduling patterns like 'first Tuesday of the month.'" Adding a fixed number of months to a date doesn't reliably land on the same weekday each time (months aren't a whole number of weeks), so an ordinal-weekday pattern needs something beyond what a plan's core Frequency/Frequency Type fields can express.

**Why C is wrong.** Maintenance Plans generate work orders by date only, not by time of day — the generated "Suggested Maintenance Date" carries no time component, so a plan can guarantee weekly recurrence, but it cannot natively guarantee those appointments land at 8:00 AM specifically; that's a scheduling/dispatch decision made afterward, not something the plan itself produces.`,
      sources:[
        {l:"Set Up Field Service Maintenance Plans — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_maintenance.htm&type=5"},
        {l:"MaintenancePlan — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_maintenanceplan.htm"}
      ]
    },
    {
      topic:"Field Service Data Model",
      select:1,
      prompt:"A Company wants to track and report on individual tasks completed, including parts consumed and pricing details, as part of the Work Order completion process. A Company wants to schedule one or multiple tasks to different Technicians as needed. How should the Consultant meet the requirement utilizing the standard Salesforce Field Service Data Model?",
      options:[
        {k:"A", t:"Create Custom Object records, each with its own child Service Appointment."},
        {k:"B", t:"Create multiple Service Appointments, each with its own child task records."},
        {k:"C", t:"Create Work Order Line Items, each with its own child Service Appointment."},
        {k:"D", t:"Create multiple Service Appointments, each with its own child Work Order Line Item."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** In the standard Field Service data model, the Work Order Line Item (WOLI) is the object built to represent an individual task or unit of work within a Work Order — it's the level at which Products Consumed, Products Required, and pricing/quantity fields are tracked and rolled up, exactly matching "individual tasks completed, including parts consumed and pricing details." Each WOLI can carry its own child Service Appointment, which lets that specific task be scheduled and dispatched to a Technician independently of the other line items — satisfying "schedule one or multiple tasks to different Technicians as needed" without leaving the standard object model.

**Why A is wrong.** Custom Objects are outside the "standard Salesforce Field Service Data Model" the question explicitly requires; parts-consumed and pricing tracking is already natively supported on Work Order Line Item, so introducing a custom object duplicates functionality that exists out of the box and breaks native Field Service reporting, scheduling, and optimization features that expect standard objects.

**Why B is wrong.** There's no standard "child task record" object hanging off Service Appointment in the Field Service data model — Service Appointment is a scheduling/dispatch record, not a container for task or parts-consumed detail. Structuring it this way also inverts the documented relationship: individual line-of-work detail (tasks, parts, pricing) belongs on Work Order Line Item, not on records subordinate to the Service Appointment.

**Why D is wrong.** This reverses the real parent-child direction. Per the ServiceAppointment object reference, \`ParentRecordId\` lets a Service Appointment point to a Work Order or Work Order Line Item as its parent — the Service Appointment is the child, referencing the WOLI, not the other way around. A Work Order Line Item cannot be modeled as a "child" of a Service Appointment in the standard schema, so this option describes a relationship the data model doesn't support.`,
      sources:[
        {l:"ServiceAppointment — Field Service Developer Guide, Salesforce Developers", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_serviceappointment.htm"},
        {l:"Work Order Line Items — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_work_order_line_items.htm&type=5"}
      ]
    },
    {
      topic:"Maintenance Plans",
      select:2,
      prompt:"A Company operates in a highly regulated industry. Technicians must conduct quarterly inspections for all customers in their region. Each inspection should be completed within a single visit and include all installed assets on site. Which two Maintenance Plan settings should the Consultant recommend? (Select all that apply)",
      options:[
        {k:"A", t:"Service Appointment Generation Method = One Service Appointment per Work Order Line Item"},
        {k:"B", t:"Service Appointment Generation Method = One Service Appointment per Work Order"},
        {k:"C", t:"Work Order Generation Method = One Work Order Line Item per Asset"},
        {k:"D", t:"Work Order Generation Method = One Work Order per asset"}
      ],
      correct:["B","C"],
      explanation:
`**Why C is right.** Work Order Generation Method controls how a Maintenance Plan covering multiple Assets structures the generated Work Order(s). "One Work Order Line Item per Asset" consolidates every covered Asset onto a single parent Work Order, with each Asset represented as its own line item — this is the setting that gets "all installed assets on site" onto one record instead of scattering them across several Work Orders.

**Why B is right.** Service Appointment Generation Method only comes into play once Work Order Generation Method is set to "One Work Order Line Item per Asset," and it decides whether that one Work Order gets one appointment or several. "One Service Appointment per Work Order" produces a single appointment covering the parent Work Order (and therefore every line item/Asset on it) — that single appointment is the "single visit" the Technician dispatches to, satisfying the requirement directly.

**Why A is wrong.** "One Service Appointment per Work Order Line Item" would generate a separate appointment for every Asset's line item. Even with all Assets consolidated onto one Work Order via setting C, this option would still send the Technician out on a distinct visit per Asset rather than one visit covering the whole site, which is exactly what the requirement rules out.

**Why D is wrong.** "One Work Order per Asset" does the opposite of consolidation — it generates an entirely separate Work Order (and, downstream, a separate appointment) for every Asset the plan covers. That fragments a regional inspection into one visit per Asset instead of the single, all-assets visit the Company needs, and it also isn't the setting that unlocks the Service Appointment Generation Method choice at all.`,
      sources:[
        {l:"Set Up Field Service Maintenance Plans — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_maintenance.htm&type=5"},
        {l:"Maintenance Plan in Field Service — MST Solutions", u:"https://www.mstsolutions.com/technical/maintenance-plan-in-field-service/"}
      ]
    },
    {
      topic:"Service Crews",
      select:1,
      prompt:"A Company needs a team to perform periodic maintenance on the most complex products. Which feature should the Consultant configure to meet this requirement?",
      options:[
        {k:"A", t:"Technicians with Required Skills"},
        {k:"B", t:"Preferred Resource"},
        {k:"C", t:"Required Resource"},
        {k:"D", t:"Service Crew"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce Help defines a Service Crew directly as "a group of service resources whose combined skills and experience make them a good fit to work together on appointments," giving the example of a wellhead repair crew pairing a hydrologist, a mechanical engineer, and an electrician. That's exactly the shape of this requirement: the most complex products need more than one specialist's skill set on-site at once, and a Service Crew is the purpose-built object for dispatching a coordinated multi-skilled team as a single unit to recurring maintenance work, with crew membership managed centrally through Crew Management independent of any one appointment.

**Why A is wrong.** "Technicians with Required Skills" describes matching a single resource's Skills against a job's Skill Requirements — it governs whether one Technician is eligible for one appointment, not how to assemble and dispatch a multi-person team together. Complex products needing several specialists at once need crew-level coordination, which skill-matching alone doesn't provide.

**Why B is wrong.** Preferred Resource is a per-appointment scheduling objective that nudges the optimizer toward a specific resource already associated with the customer or account (continuity of service) — it's about resource preference for a single technician, not about assembling a team with combined skills.

**Why C is wrong.** Required Resource is a work rule that mandates specific named resources (or resources meeting hard constraints) be assigned to an appointment — it constrains who can be assigned but doesn't create or manage a standing multi-skilled team the way a Service Crew does, and it isn't the documented mechanism for this scenario.`,
      sources:[
        {l:"Create Service Crews for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_crews.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling Work Rules",
      select:1,
      prompt:"Which Work Rule should a Salesforce Field Service Consultant use to assign Service Resources based on related object records?",
      options:[
        {k:"A", t:"Resource Availability"},
        {k:"B", t:"Match Field"},
        {k:"C", t:"Extended Match"},
        {k:"D", t:"Required Resource"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's documentation for the Extended Match work rule type describes exactly this mechanism: it "uses a junction, or linking, object to match a field on the Service Appointment object to a related list on the Service Resource object." That junction/linking object is what lets the rule reach beyond the two core records and match on data that lives on a related object — precisely "based on related object records," which is the scenario this rule type was purpose-built for.

**Why A is wrong.** Resource Availability is a work rule that checks a resource's set working hours/time-off against the appointment's window — it governs *when* a resource can work, not whether a *related record* qualifies them for the job. It has nothing to do with matching through a linking object.

**Why B is wrong.** Match Fields performs a direct field-to-field comparison between a field on the Service Appointment and a field on the Service Resource — a two-sided comparison with no linking/junction object involved. It can enforce "this field on the appointment must equal that field on the resource," but it can't reach into a related object's records the way Extended Match does.

**Why D is wrong.** Required Resource mandates that one or more specific, named Service Resources be assigned to a Service Appointment (or excludes specific ones) — it's a hard constraint on named resources, not a mechanism for evaluating related object records to determine eligibility.`,
      sources:[
        {l:"Work Rule Type: Extended Match — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_optimization_theory_work_rules_extended_match.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Match Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_match_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Asset Lifecycle",
      select:1,
      prompt:"A Company sells products that are made up of serialized components. Technicians often need to work on a specific component. How should a Consultant recommend tracking customer purchases so Work Orders can be assigned to a component?",
      options:[
        {k:"A", t:"Use Work Orders and define a hierarchy."},
        {k:"B", t:"Use Products and Products Families."},
        {k:"C", t:"Uses Assets and define a hierarchy."},
        {k:"D", t:"Use Orders and Order Products."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Assets are Salesforce's object for tracking the specific products a customer owns post-sale — and Asset supports a Parent Asset field plus an Asset Hierarchy related list, so a serialized component can be modeled as a child Asset nested under the parent product Asset. Because Work Orders (and Work Order Line Items) relate directly to the Asset object, a technician can be dispatched against the exact child Asset representing the individual serialized component, giving full visibility into which specific part needs service and preserving that part's own service history.

**Why A is wrong.** Work Orders record the service work itself; they aren't a catalog or ownership record and have no mechanism for tracking "what a customer purchased." Defining a hierarchy of Work Orders doesn't create a record of the customer's owned components — it only nests service transactions, which isn't what's being asked for here.

**Why B is wrong.** Products and Product Families describe what a company sells in general (the catalog) — they aren't tied to a specific customer's purchase or a specific serial number. A Work Order can't be assigned to a generic catalog Product; there's no per-customer, per-unit record to dispatch a technician against.

**Why D is wrong.** Orders and Order Products capture the sales transaction (what was ordered and at what price), but they don't represent a serviceable, hierarchical install base. Work Orders in Field Service are built to relate to Assets, not Order Products, so Order Products can't be the target a technician's Work Order is assigned to.`,
      sources:[
        {l:"Asset Hierarchies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.assets_hierarchies.htm&type=5"},
        {l:"Track Customer Assets — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A Customer wants to return a defective product instead of scheduling a Service Appointment. How should this product be tracked in Salesforce Field Service?",
      options:[
        {k:"A", t:"Create a Product Request and Product Request Line Item."},
        {k:"B", t:"Create a Return Order and Return Order Line Item."},
        {k:"C", t:"Create a Return Order and relate it to the Product."},
        {k:"D", t:"Create a Work Order and Work Order Line Item."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Field Service ships purpose-built objects for exactly this scenario: Return Order is the header record that represents the customer's request to send a product back, and Return Order Line Item captures the specific item, quantity, and reason for the return. This pairing is Salesforce's documented pattern for tracking customer returns — it lets support and inventory teams process the defective unit without ever touching the scheduling/dispatch objects, since no truck roll is needed.

**Why A is wrong.** Product Request and Product Request Line Item exist to move parts *toward* a job — a technician or agent requesting stock be transferred from a warehouse to a truck or site for an upcoming or in-progress Work Order. They model an outbound parts fulfillment, not a customer sending a defective product back, so they can't represent this transaction.

**Why C is wrong.** A bare Return Order with no Line Item can't capture the transaction-level detail (which specific product, what quantity, what condition/reason) that a return requires. Relating the header record directly to a Product skips the line-item layer that Return Order Line Item is designed to provide, so the return can't be properly tracked or processed.

**Why D is wrong.** Work Order and Work Order Line Item exist to track service work performed, typically tied to a Service Appointment and a dispatched technician. The customer explicitly wants to avoid scheduling a Service Appointment, so creating a Work Order works against the stated requirement and is the wrong object pair for a product return.`,
      sources:[
        {l:"Track Customer Returns in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_return_orders.htm&language=en_US&type=5"},
        {l:"Return Order Line Item Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.om_return_order_line_item_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling Policies",
      select:2,
      prompt:"A Company asks its clients for feedback on every service visit. A Company wants to dispatch the appropriate Technicians based on customer feedback. What are two ways the Consultant can meet this requirement? (Select all that apply)",
      options:[
        {k:"A", t:"Configure and add excluded and required Work Rules to Scheduling Policies."},
        {k:"B", t:"Configure and add excluded and required resource business objectives to Scheduling Policies."},
        {k:"C", t:"Configure customer preferences on the Service Resource record."},
        {k:"D", t:"Configure resource preferences on Accounts."}
      ],
      correct:["A", "D"],
      explanation:
`**Why D is right.** Resource Preferences are Field Service records that capture how a customer felt about a technician on a past visit, and they're created from the Resource Preferences related list on the Account (as well as Asset, Location, or Work Order). Each preference is typed as Preferred, Excluded, or Required — exactly the mechanism needed to turn service-visit feedback ("this tech was great," "never send this tech again") into a record the scheduling engine can read.

**Why A is right.** Capturing the preference on the Account isn't enough by itself — the Scheduling Policy has to be told to respect it. Salesforce ships two purpose-built Work Rule types for this: Required Resources, which forces the optimizer/scheduler to assign a specific resource, and Excluded Resources, which hard-blocks a specific resource from being assigned. Adding both to the active Scheduling Policy is what makes Required/Excluded Resource Preferences actually enforced during scheduling and optimization.

**Why B is wrong.** "Resource business objectives" isn't the correct mechanism for a hard Required/Excluded rule — Scheduling Objectives are the soft, weighted layer of the optimizer (used for things like minimizing travel or maximizing preferred-resource matches), not a hard constraint. There's also no "excluded and required" objective type; that framing belongs to Work Rules, not Objectives, which makes this option a mix of the wrong tool and the wrong terminology.

**Why C is wrong.** The direction is reversed. The feedback is about how the *customer* experienced a given *technician*, so the preference belongs on the customer-side record (Account, Asset, Location, or Work Order) via Resource Preferences — not on the Service Resource record itself, which represents the technician, not the customer relationship.`,
      sources:[
        {l:"Add Service Resource Preferences in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_resource_preferences.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Required Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_required_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Sharing & Territories",
      select:1,
      prompt:"The Org-Wide sharing for a Service Appointment set to Private. If the Service Appointment is cancelled, which users will have visibility to the record?",
      options:[
        {k:"A", t:"Assigned Resources, Owner of Service Appointment and members of Service Territory."},
        {k:"B", t:"Assigned Resources, Owner of Service Appointment and members of User Territory."},
        {k:"C", t:"Owner of Service Appointment and members of Service Territory."},
        {k:"D", t:"Owner of Service Appointment and members of User Territory."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Salesforce's own documentation on limiting access to Field Service records states this explicitly: "When an appointment is canceled, it's visible only to the appointment owner and the relevant dispatchers based on the user territory object." Once a Service Appointment reaches Canceled status, the normal, broader sharing rules stop applying and visibility collapses down to just two groups — the record Owner and the dispatchers who see it through User Territory membership.

**Why A and C are wrong.** Both options include "members of Service Territory," but standard Service Territory-based sharing (the Public Group tied to the appointment's territory) is part of the *normal* sharing that applies to active appointments — it's specifically what gets superseded once the record is canceled. Canceled visibility runs through the User Territory object instead, not Service Territory membership.

**Why A and B are wrong.** Both options include Assigned Resources. The technician-facing "share dispatched service appointments with their assigned resources" mechanism exists to give a resource visibility into the work assigned to them — but that relevance ends once the appointment is canceled and there's no more dispatched work to see. Canceled appointments drop Assigned Resource access along with Service Territory access, leaving only Owner and User Territory-based dispatcher visibility.`,
      sources:[
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_sharing.htm&language=en_US&type=5"},
        {l:"Service Appointment Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_appointment_fields.htm&type=5"}
      ]
    },
    {
      topic:"Service Reports",
      select:1,
      prompt:"Technicians often need to generate a report in the customer's language. Which configuration should the Consultant recommend to meet the requirement?",
      options:[
        {k:"A", t:"Update the Default Language of the Organization."},
        {k:"B", t:"Update the Language of the current User."},
        {k:"C", t:"Add the Language field to the Contract Page Layout."},
        {k:"D", t:"Add the Service Report Language field to the Work Order Page Layout."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** After Translation Workbench is enabled and the needed languages are selected, Document Builder exposes them through the Service Report Language field on Work Order — add that field to the Work Order page layout, and the technician can pick the customer's language from the dropdown before generating the service document. All service appointments under that work order are then translated into the selected language, giving per-job, per-customer control over the report's language.

**Why A is wrong.** The org's Default Language sets the baseline language for the Salesforce UI and org-wide defaults — it's a single, org-level setting. Changing it doesn't give technicians the ability to choose a different language per work order for a specific customer; it would just shift everyone's default experience instead of solving the per-report requirement.

**Why B is wrong.** A User's Language field controls how that individual sees the Salesforce interface — labels, picklists, and their own session — not the language baked into a generated PDF service report. It's also impractical: a technician would have to keep switching their own personal language setting before every job just to match whichever customer they're visiting next.

**Why C is wrong.** Contract has no Language field or mechanism tied into Document Builder's service report generation. The language selection Document Builder reads from lives on the Work Order (Service Report Language field), not on Contract, so adding a field there wouldn't affect what language the report is produced in.`,
      sources:[
        {l:"Translate Service Documents in Document Builder — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_document_builder_translate.htm&language=en_US&type=5"},
        {l:"Field Service Guidelines for Creating Service Report Templates — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_customer_report_guidelines.htm&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:1,
      prompt:"One of A Company's customers allows maintenance only between 12 PM - 1:00 PM. On which object should a Consultant set Operating Hours to meet this requirement?",
      options:[
        {k:"A", t:"Service Territories"},
        {k:"B", t:"Service Territory Members"},
        {k:"C", t:"Service Appointments"},
        {k:"D", t:"Accounts"}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Operating Hours can be related to the Account record to represent that customer's own availability for service — in this case, the one-hour window from 12 PM to 1 PM. When a Work Order is created for that Account, those hours flow into the Work Order's Visiting Hours field, and the Service Appointment Visiting Hours work rule enforces the window during scheduling and optimization, keeping technicians from being booked outside the times the customer actually allows access.

**Why A is wrong.** Operating Hours on Service Territory set the *default* working hours for the territory as a whole (and the resources in it, unless overridden). That controls when the business operates in a region — it has no way to express that one specific customer only permits access for a single hour of the day.

**Why B is wrong.** Operating Hours on Service Territory Member define an individual resource's own working schedule when it differs from the territory default — this is about when the *technician* is available to work, not when a particular *customer* will allow a technician on site.

**Why C is wrong.** Service Appointment doesn't carry an Operating Hours relationship at all; its scheduling constraints come from fields like Earliest Start Permitted, Due Date, and Arrival Window, not from an Operating Hours lookup, so it isn't the object the Consultant would configure for this requirement.`,
      sources:[
        {l:"Guidelines for Creating Operating Hours for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_oh_considerations.htm&language=en_US&type=5"},
        {l:"Create Operating Hours for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_oh_create.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Service Reports",
      select:1,
      prompt:"When completing a Work Order in the field, the Technician needs to capture two signatures to ensure compliance. Which steps are needed to configure the signature capture?",
      options:[
        {k:"A", t:"Create relevant Signature Types and add Signature Blocks to the Service Report Template."},
        {k:"B", t:"Create two Service Reports and add one Signature Block to each Report."},
        {k:"C", t:"Create two custom custom fields for the Service Appointment and use Flows to capture each signature."},
        {k:"D", t:"Create a Flow that adds two Signature Blocks when the Service Report is generated."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Service Report Templates natively support multiple signatures — a template can hold up to 20 signature blocks, with the one hard rule being that every signature block needs a different Signature Type. So the correct, fully declarative configuration is to define the two distinct Signature Types the business needs (for example, Technician and Customer) and drag two Signature elements onto the template, each bound to its own type. No code or automation is required.

**Why B is wrong.** Splitting the requirement across two separate Service Reports is unnecessary and works against how the feature is designed — a single Service Report Template already supports multiple signature blocks. Generating two reports for one Work Order just to capture two signatures adds complexity and a fragmented customer-facing document for no benefit.

**Why C is wrong.** Custom fields plus Flow automation is a build-heavy workaround for something the platform already provides out of the box. Signature Block and Signature Type are standard Service Report Template components purpose-built for exactly this — capturing a proper signature image needs the dedicated Signature element, not a custom field driven by Flow logic.

**Why D is wrong.** Signature Blocks are added declaratively at design time in the template editor, not injected dynamically at document-generation time. There's no supported pattern where a Flow adds Signature Blocks to a Service Report as it's generated — the blocks and their types must already be configured on the template itself.`,
      sources:[
        {l:"Field Service Guidelines for Creating Service Report Templates — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_customer_report_guidelines.htm&type=5"},
        {l:"Create Field Service Report Templates — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_customer_reports_settings.htm&type=5"}
      ]
    },
    {
      topic:"Work Skills",
      select:2,
      prompt:"A Company is implementing Work Order Management. What two approaches should the Consultant consider to create work skills for the Service Resources? (Select all that apply)",
      options:[
        {k:"A", t:"Create the work skills using the FSL Lightning Web Component. Assign the skills to the Service Resources. Add the skill to Work Types and Work Orders."},
        {k:"B", t:"Create the work skills using the Guided Setup wizard. Assign the skills to Service Resources using Guided Setup."},
        {k:"C", t:"Create the work skills using the FSL Lightning Managed Package wizard. Assign the skills to Service Resources. Add the skill to Work Types and Work Orders."},
        {k:"D", t:"Create the work skills using Setup. Manually assign to Resources."}
      ],
      correct:["B", "D"],
      explanation:
`**Why B is right.** When the Field Service managed package is installed, Guided Setup lets a Consultant create and assign skills directly inside the same flow used to create Work Types and Service Resources. It's the streamlined, wizard-driven path: skills, their assignment to resources, and the related setup steps all happen together without leaving Guided Setup.

**Why D is right.** The manual path is the alternative for orgs not using (or past) Guided Setup: create Skill records in Skill Settings under Setup, then assign them to individual Service Resources via the Skills related list on the resource record (with a skill level and optional start/end dates). Skill Requirements are then added separately to Work Types and Work Orders/Work Order Line Items — a fully declarative, Setup-driven process.

**Why A is wrong.** There's no "FSL Lightning Web Component" for creating work skills. This option pairs the correct follow-on actions (assign to resources, add to Work Types/Work Orders) with a mechanism that doesn't exist as the way skills get created, making it a fabricated approach.

**Why C is wrong.** Likewise, there's no "FSL Lightning Managed Package wizard" as a distinct skill-creation tool — the actual managed-package-driven tool is Guided Setup (option B), not a separately named wizard. This option invents a tool name rather than describing either real approach.`,
      sources:[
        {l:"Create Skills for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_skills.htm&language=en_US&type=5"},
        {l:"Set Up Your Field Service Workforce — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_set_up_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Licensing",
      select:1,
      prompt:"A Company has a call center that responds to request from customers and schedules time for Field Service Engineers (FSEs) to perform work on assets owned by the client. Call Center Agents are responsible for booking appointments. Which Permission Set License should be assigned to the Call Center Agents?",
      options:[
        {k:"A", t:"FSL Agent License"},
        {k:"B", t:"FSL Admin License"},
        {k:"C", t:"FSL Resource License"},
        {k:"D", t:"FSL Dispatcher License"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The FSL Agent License is built exactly for this role: it grants "access [to] all global actions and their related objects to create, book, and schedule Service Appointments." That's precisely what a call center agent does — take an inbound request and get a Service Appointment booked for an FSE — without needing Dispatcher Console access or the mobile app. (In current Salesforce documentation this same license has been renamed the Field Service Call Center Rep License, but it carries the identical description and purpose the exam question's "FSL Agent" terminology refers to.)

**Why B is wrong.** The FSL Admin License is for administrators who manage the Field Service Admin app, Field Service objects, and the underlying Visualforce pages and logic/services that power the managed package. A front-line agent booking appointments has no need for that administrative configuration access.

**Why C is wrong.** The FSL Resource License is assigned to the field technicians/FSEs themselves — the mobile workforce who actually perform the on-site work and need the Field Service mobile app. It's the opposite end of the process from the call center agent scheduling the visit.

**Why D is wrong.** The FSL Dispatcher License is for the role that optimizes schedules and manages resources across the whole operation from the Dispatcher Console/Gantt — reshuffling, reassigning, and monitoring many technicians' schedules at once. A call center agent simply booking a single appointment doesn't need that broader orchestration toolset.`,
      sources:[
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"},
        {l:"Configure the Salesforce Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000383184&language=en_US&type=1"}
      ]
    },
    {
      topic:"Asset Lifecycle",
      select:1,
      prompt:"A Company wants to report on its Assets and reflect their attributes including hierarchical relationships. How should the Consultant meet this requirement?",
      options:[
        {k:"A", t:"Create custom reports and reference the Parent Asset and Root Asset fields."},
        {k:"B", t:"Use standard reports and reference the Parent Asset and Root Asset fields."},
        {k:"C", t:"Use the Assets without Products report."},
        {k:"D", t:"Enable and customize the View Asset Hierarchy action."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's documentation on Asset hierarchies is explicit about this exact limitation: "The Parent Asset and Root Asset fields aren't available in standard reports that include assets. However, you can reference them in custom reports." So to reflect hierarchical attributes in reporting, the Consultant needs to build a custom report (backed by a custom report type on Asset) that explicitly references those two fields — the standard, out-of-the-box report types don't expose them.

**Why B is wrong.** This is the direct opposite of what Salesforce documents — standard reports on Assets specifically do *not* surface the Parent Asset and Root Asset fields, which is exactly why a custom report is required.

**Why C is wrong.** Assets without Products is a real standard report, but it exists to surface Assets that lack a related Product record — a data-quality check, not a way to reflect hierarchical relationships. It has nothing to do with Parent/Root Asset attributes.

**Why D is wrong.** The View Asset Hierarchy action gives a visual tree of one Asset's relationships on that Asset's own detail page — useful for browsing a single record, but it isn't a report: it can't be run across the full Asset population, added to a dashboard, subscribed to, or exported the way an actual report can, so it doesn't meet a company-wide reporting requirement.`,
      sources:[
        {l:"Asset Relationships and Hierarchies — Salesforce Help", u:"https://help.salesforce.com/apex/HTViewHelpDoc?id=sf.assets_rel_hierarchical.htm&language=en_us"},
        {l:"Asset Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.assets_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Work Skills",
      select:2,
      prompt:"A Company wants to schedule Work Order only if Technicians have the necessary qualifications to complete the designated work. In which two ways can A Company achieve this? (Select all that apply)",
      options:[
        {k:"A", t:"Create Skills that relate to qualifications from the Skills tab and assign them to a Service Resource."},
        {k:"B", t:"Leverage the Match Skills Scheduling Policy when scheduling Appointments."},
        {k:"C", t:"Create Skills that relate to qualifications from Setup and assign them to a Service Resource."},
        {k:"D", t:"Leverage the Match Skills Work Rule when scheduling Appointments."}
      ],
      correct:["C", "D"],
      explanation:
`**Why C is right.** Skills are created and managed through Skill Settings in Setup — an admin navigates there, clicks New, and enters the skill's name, description, and optional Skill Type. Once created, the skill is assigned to a technician from the Skills related list on their Service Resource record, with a skill level representing their qualification. That's the documented, standard-configuration path for building out the qualifications a technician can hold.

**Why D is right.** Match Skills is a Work Rule type purpose-built for this exact requirement: it "matches a service appointment's skill requirements with a service resource's assigned skills," and if a resource lacks an assigned skill (or the required level), Salesforce's own documentation states plainly that "the resource isn't a valid candidate for any service appointment with skill requirements." Adding this Work Rule to the active Scheduling Policy is what actually blocks scheduling to unqualified technicians.

**Why A is wrong.** There's no standard "Skills tab" used to create Skill records — the documented, supported path is Skill Settings inside Setup, not a separate app tab. This option pairs the correct follow-on action (assigning to a Service Resource) with a navigation path that isn't how Skills are actually created.

**Why B is wrong.** "Match Skills Scheduling Policy" doesn't exist as a named object. Match Skills is a Work Rule *type* that gets added to a Scheduling Policy — Salesforce's documentation is explicit that "Add work rules to a scheduling policy," confirming Match Skills is a component of a policy, not a policy itself. This option mislabels the mechanism.`,
      sources:[
        {l:"Work Rule Type: Match Skills — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5"},
        {l:"Create Skills for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_skills.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"Each door lock that A Company sells has a unique 20 digit code. The code represents the manufacturer, production run, and production number. A Company needs to track each lock. In addition to the installed locks, all Technicians carry five replacement units in their van stock. How should a Company track the van stock door locks?",
      options:[
        {k:"A", t:"Create a Product Item and enter the serial numbers in the related list."},
        {k:"B", t:"Create a Product Item for each door lock utilizing standard fields."},
        {k:"C", t:"Create a Product Item with all the serial numbers in the notes section."},
        {k:"D", t:"Create a Product Item and enter the Technicians' lock quantity."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** This is exactly the documented pattern for serialized inventory: mark the door lock Product as Serialized, then create a single Product Item representing that product at the technician's van (Location) with Quantity on Hand starting at 0.00. From there, each individual unit's 20-digit code is entered as its own record in the Serialized Products related list on that Product Item — one Product Item per location, with the related list capturing every unique serial number and automatically rolling the quantity up as units are added.

**Why B is wrong.** Creating a separate Product Item per physical lock isn't how Salesforce models serialized van stock — Product Item represents a product's presence *at a location*, not an individual serialized unit. "Standard fields" also has no field built to hold a 20-digit unique identifier per unit; that's precisely what the Serialized Products related list exists for.

**Why C is wrong.** Dumping 20-digit codes into a notes/description field is unstructured text — it can't be searched, reported on, validated for uniqueness, or consumed/transferred through Field Service's inventory transactions the way a proper Serialized Products record can.

**Why D is wrong.** Recording just the quantity (5) tracks how many locks are in the van, but throws away the entire point of the requirement — knowing exactly *which* serialized units are there. A Company explicitly needs to track each lock's unique code, not just a count.`,
      sources:[
        {l:"Create Serialized Inventory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_serialized_inventory.htm&language=en_US&type=5"},
        {l:"Manage Your Field Service Inventory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=fs_manage_inventory.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Work Orders & Appointments",
      select:2,
      prompt:"A Company has discovered that many of its Technicians' initial visits require a return visit to complete the work. Which two approaches should a Consultant recommend to accurately track these visits? (Select all that apply)",
      options:[
        {k:"A", t:"Reschedule the Work Order for the new date."},
        {k:"B", t:"Create a New Work Order and Service Appointment."},
        {k:"C", t:"Create a new Service Appointment on the original WorkOrder."},
        {k:"D", t:"Reschedule the Service Appointment for the new Date."}
      ],
      correct:["C", "D"],
      explanation:
`**Why D is right.** When the return trip is really a continuation of the same visit — the technician simply needs more time and picks back up where they left off — rescheduling the existing Service Appointment to the new date keeps everything (status history, time tracking, notes) on that one appointment record while accurately reflecting when the work will actually happen.

**Why C is right.** When the return trip is better represented as its own distinct visit — a separate dispatch, possibly a different technician, its own start/end times and its own completion status — the Consultant should add a new Service Appointment to the original Work Order. This keeps the return visit tied to the same job (and its existing Work Order Line Items, parts, and Assets) while still giving each visit its own trackable appointment record.

**Why A is wrong.** Work Order itself doesn't carry a scheduled date/time to "reschedule" — that scheduling data (Scheduled Start/End, Arrival Window) lives on the Service Appointment. There's no supported action to reschedule a Work Order directly.

**Why B is wrong.** Spinning up an entirely new Work Order fragments the job: the new Work Order starts disconnected from the original's Work Order Line Items, consumed parts, and Assets, so the Consultant would have to manually re-link or duplicate that data just to keep the return visit tied to the same underlying job — the opposite of accurate, unified tracking.`,
      sources:[
        {l:"Guidelines for Creating Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_appointment_guidelines.htm&type=5"},
        {l:"Guidelines for Creating Work Orders for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.wo_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Licensing",
      select:1,
      prompt:"At A Company, agents are expected to complete a variety of tasks. They create Cases and Work Orders, and need Read access to Work Types and Work Rules. They also book and manage Appointments, assign Mobile Resources, and optimize their Mobile Workforce's Schedule. What is the best Permission Set(s) a consultant should recommend assigning to A Company Agents?",
      options:[
        {k:"A", t:"Agent and Resource"},
        {k:"B", t:"Dispatcher"},
        {k:"C", t:"Agent"},
        {k:"D", t:"Mobile, Agent, and Resource"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** The Field Service Dispatcher permission set is documented as a superset: it "contains the permissions included in Field Service Call Center Rep Permissions and Field Service Resource Permissions along with permissions to operate the Classic Dispatch Console and run optimization." In other words, Dispatcher already bundles everything the Agent/Call Center Rep set provides (creating Cases and Work Orders, reading Work Types and Work Rules) plus the Resource-level access, and adds the ability to book/manage appointments, assign resources, and run schedule optimization on top. One clean permission set covers every task listed — no stacking required.

**Why C is wrong.** The Agent (Call Center Rep) permission set only grants "the minimum permissions needed to use the Field Service global actions, such as Book Appointment, Get Candidates, and Emergency actions." It has no Dispatch Console access and no ability to run schedule optimization, so it falls short of "assign Mobile Resources" and "optimize their Mobile Workforce's Schedule."

**Why A is wrong.** Since Dispatcher already contains everything in both Agent and Resource permissions plus the Dispatch Console and optimization capability, stacking Agent and Resource together still leaves the agents without console/optimization access — and even if it didn't, it would be redundant next to simply assigning the single Dispatcher set that already includes both.

**Why D is wrong.** Adding Mobile on top of Agent and Resource compounds the same problem: it's an even more bloated combination that still can't reach Dispatch Console or optimization functionality, which only the Dispatcher permission set provides. It violates least-privilege/least-complexity best practice compared to the one purpose-built set that already covers the full requirement.`,
      sources:[
        {l:"Create Field Service Permission Sets — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_get_started.htm&language=en_US&type=5"},
        {l:"Configure the Salesforce Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=000383184&language=en_US&type=1"}
      ]
    },
    {
      topic:"Scheduling Policies",
      select:1,
      prompt:"Customer Relationships and reliable service are main focus this year at A Company. Management has asked that once a technician has serviced a customer, they continue to service that customer when possible. What should the consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Include the Require Resource Work Type in Scheduling Policies."},
        {k:"B", t:"Assign a Preferred Status Resource Preference to the Account."},
        {k:"C", t:"Designate a Skill-based resource to the Work Order."},
        {k:"D", t:"Configure an Account Preference on the Service Resource record."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Resource Preferences are created from the related list on the Account (or Asset, Location, or Work Order) and support a Preferred type specifically for this soft-continuity scenario. Management's own wording — "continue to service that customer *when possible*" — is a preference, not a hard mandate, and Preferred is exactly the preference type built for that: it's read by the weighted Resource Preference scheduling objective, boosting that technician's odds of being assigned again without blocking the job if they're unavailable.

**Why A is wrong.** There's no "Require Resource Work Type" feature — the real, related mechanism is the Required Resources Work Rule. But even read charitably as that, "Required" is a hard constraint: it would force that specific technician onto every future appointment for the customer, which overshoots "when possible" and would leave jobs unschedulable whenever that technician isn't available — the opposite of what a soft continuity preference calls for.

**Why C is wrong.** Skill-based resource assignment matches a technician to a job based on qualifications, not on which customer they've served before. It has no mechanism for remembering "this technician already has a relationship with this customer."

**Why D is wrong.** This reverses where the preference belongs. The record of "which technician this customer prefers" is a Resource Preference stored on the customer-side record (the Account) — not a preference configured on the Service Resource, which represents the technician, not the customer relationship.`,
      sources:[
        {l:"Add Service Resource Preferences in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_resource_preferences.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Required Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_required_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Parts & Inventory",
      select:1,
      prompt:"A Company is rolling out Inventory Management. A Company wants to automatically associate certain Parts to Work Orders upon creation based on the work to be performed. How should the Consultant meet this requirement?",
      options:[
        {k:"A", t:"Add Products to the Work Order Products Related List on the Work Type object."},
        {k:"B", t:"Add Products to the Products Required Related List on the Work Type object."},
        {k:"C", t:"Add Products to the Work Order Products Related List on the Asset object."},
        {k:"D", t:"Add Products to the Products Required Related List on the Asset object."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce's documentation states this directly: "Adding required products to work types saves you time and keeps your business processes consistent. Work orders and work order line items inherit their work type's required products." The Consultant adds each part to the Products Required related list on the Work Type record (product, quantity, and unit of measure), and any Work Order subsequently created from that Work Type automatically inherits those required products — exactly the "based on the work to be performed" logic the requirement describes.

**Why A is wrong.** There's no "Work Order Products" related list on Work Type — the real related list that drives this inheritance is named Products Required. This option pairs the right object with a related list name that doesn't exist.

**Why C is wrong.** This combines two errors: the fabricated "Work Order Products" related list name, plus the wrong object — Asset doesn't drive which parts a new Work Order inherits at creation time.

**Why D is wrong.** Products Required is the correct related list, but it needs to live on the Work Type, not the Asset. Asset represents the specific piece of equipment being serviced, not the category of work being performed, so it isn't what a Work Order looks to when it's created and needs to inherit required parts.`,
      sources:[
        {l:"Track Required Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_products_required.htm&language=en_US&type=5"},
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Optimization",
      select:2,
      prompt:"Optimization for the Midwest territory is set to automatically run each night for the next three days. The Dispatcher has noticed that the optimizer is leaving many Service Appointments unscheduled and has asked the Consultant to troubleshoot the issue. The Consultant notices that the Optimization Run Time per Service Appointment is set to Low in the Field Service Settings. Which two conditions would make the Consultant consider setting the optimizer to High? (Select all that apply)",
      options:[
        {k:"A", t:"The Scheduling Policy is producing too many candidates that qualify for each Service Appointment."},
        {k:"B", t:"The Scheduling Policy Used field is blank."},
        {k:"C", t:"The Calculate travel and breaks Field Service Setting is disabled for the Service Resource Availability Work Rule."},
        {k:"D", t:"Most Service Appointments have the same priority."}
      ],
      correct:["A", "D"],
      explanation:
`**Why A is right.** Run Time per Appointment is the computational budget the optimization engine spends evaluating each appointment before it commits to a placement (or gives up). When a Scheduling Policy returns a large pool of qualifying candidates, the engine has a much bigger combination of resources, time slots, and downstream schedule impacts to weigh for that one appointment. On Low, it can run out of budget mid-evaluation and leave the appointment unscheduled rather than finish comparing all the viable candidates — exactly the symptom the Dispatcher is seeing. Raising the run time gives it the time it needs to work through that larger candidate pool.

**Why D is right.** Priority exists to help the engine quickly triage which appointments matter most when resources are constrained. When most appointments carry the same priority, that shortcut disappears — the engine can't quickly rule appointments in or out based on priority and instead has to do more even-handed, exhaustive comparison across a lot of similarly-ranked appointments to find the best overall arrangement. That extra evaluation work is exactly what a higher run time budget accommodates.

**Why B is wrong.** A blank Scheduling Policy Used field points to a missing/incomplete configuration on the optimization setup itself, not to the engine needing more time to think. No amount of additional run time fixes a policy that was never properly assigned — that's a setup error to correct directly, unrelated to the Low/High run time trade-off.

**Why C is wrong.** As stated, this Field Service Setting is *disabled*, which removes a computationally expensive step (calculating travel time and break windows) from the engine's evaluation rather than adding one. That makes each appointment's evaluation simpler, not harder — the opposite of a condition that would justify moving to a higher run time.`,
      sources:[
        {l:"Monitor Field Service Schedule Optimization Requests — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=pfs_monitor_optimization_requests.htm&language=en_US&type=5"},
        {l:"Global Optimization Planning for Efficient Scheduling — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-optimization/plan-ahead-with-global-optimization"}
      ]
    },
    {
      topic:"Scheduling & Dispatch",
      select:1,
      prompt:"A Company wants to dispatch emergency work identified throughout the day that needs to be completed before lower-priority work. What should the Consultant recommend to meet this requirement?",
      options:[
        {k:"A", t:"Create a custom Gantt action to call an Apex class to reschedule Appointments."},
        {k:"B", t:"Write a batch Apex Class to unschedule low priority Work Orders."},
        {k:"C", t:"Apply the Reshuffle action within the Gantt."},
        {k:"D", t:"Define a Global Optimization job to run hourly."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Reshuffle is the declarative Gantt action purpose-built for slotting a newly-identified, higher-priority appointment into an already-full day: applied to the emergency appointment, it can move other bookings to different slots, shifts, or resources, and explicitly reschedules lower-priority appointments to make room — even allowing a temporary overlap if the appointment's "Schedule over lower priority appointment" setting permits it. It's immediate, works the instant emergency work is identified, and requires no custom development.

**Why A is wrong.** Building a custom Gantt action backed by Apex to reschedule appointments means writing and maintaining code to reproduce logic Reshuffle already provides out of the box. Best-practice implementation always favors the standard, declarative feature over custom development when one already meets the requirement.

**Why B is wrong.** A batch Apex class runs in scheduled batches, not the instant an emergency job is flagged, and "unscheduling" low-priority Work Orders wholesale is a blunt, disruptive action compared to Reshuffle's targeted rebalancing — plus it's unnecessary custom code for a solved problem.

**Why D is wrong.** Global Optimization is designed to re-optimize the broader schedule (travel efficiency, workload balance) across a territory, typically run on a recurring cadence like nightly. Even run hourly, it introduces up to an hour of delay before urgent work gets prioritized — far too slow for emergency work that's "identified throughout the day" and needs to jump the queue immediately.`,
      sources:[
        {l:"Reshuffle Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.pfs_reshuffling.htm&type=5"},
        {l:"Optimize Today's Field Service Schedule — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_in_day_optimization.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Fundamentals",
      select:3,
      prompt:"A Company wants to reduce its mean-time-to-service. Which three Field Service processes should a Consultant recommend to accomplish this goal?",
      options:[
        {k:"A", t:"Scheduling"},
        {k:"B", t:"Dispatching"},
        {k:"C", t:"Customer Entitlements"},
        {k:"D", t:"Knowledge Base"}
      ],
      correct:["A", "B", "D"],
      explanation:
`**Why A is right.** Efficient Scheduling — matching the right qualified resource to the right appointment quickly through a well-tuned Scheduling Policy — directly cuts the gap between a request coming in and a technician actually getting booked. It's the first operational lever on mean-time-to-service.

**Why B is right.** Dispatching keeps that plan current in real time: the dispatcher console's Gantt, Reshuffle, and Get Candidates let a dispatcher actively re-optimize the day as things change, minimizing gaps and delays between an appointment being assigned and a technician actually arriving on site.

**Why D is right.** Mobile Knowledge puts diagnostic articles and repair instructions in the technician's hands in the field, cutting the time spent diagnosing an issue on-site and reducing repeat visits from a wrong first attempt — both of which shorten the overall time-to-resolution once the technician is dispatched.

**Why C is wrong.** Customer Entitlements and Milestones exist to track and enforce SLA/contract terms — verifying coverage and holding response-time commitments accountable with escalations. That's a compliance and measurement layer, not an operational process that itself speeds up getting a technician to the customer; it tells you *whether* and *how fast* service is owed, not *how* to deliver it faster.`,
      sources:[
        {l:"Field Service Key Concepts and Glossary — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_key_concepts.htm&language=en_US&type=5"},
        {l:"Complete Guide to Salesforce Field Service — Salesforce Ben", u:"https://www.salesforceben.com/salesforce-field-service/"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:1,
      prompt:"How should the Consultant recommend the highest revenue generating Service Appointments on the Gantt?",
      options:[
        {k:"A", t:"Color code using Gantt Palettes."},
        {k:"B", t:"Create a Gantt Action to highlight."},
        {k:"C", t:"Use Map Report Layers."},
        {k:"D", t:"Add the relevant field to the Field Set."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Gantt Palettes are built for exactly this: a palette can be based on a Service Appointment field of type checkbox, picklist, date, date-time, number, percent, or currency — a revenue field qualifies directly. For a numeric/currency field, the Consultant configures how many colors to use, a minimum and maximum color, and the corresponding minimum and maximum value, so appointments shade along that color spectrum based on their revenue. Once marked Active, dispatchers see the highest-revenue appointments visually distinguished right on the Gantt — no custom code required.

**Why B is wrong.** Gantt Actions (like Reshuffle, Cancel, or Complete) are operational commands a dispatcher runs against an appointment — they change scheduling state, not visual appearance. There's no "highlight" action, and Gantt Actions aren't the mechanism for ongoing, data-driven color coding.

**Why C is wrong.** Map Report Layers overlay geographic/boundary data (like territory shapes) on the Field Service map view — a completely different view from the Gantt, and unrelated to color-coding appointment bars by a field value.

**Why D is wrong.** Field Sets control which fields a custom Visualforce or Lightning component can loop over and render — they have no connection to the Gantt's native display or its color logic, which is governed by Gantt Palettes instead.`,
      sources:[
        {l:"Customize the Colors of the Salesforce Field Service Gantt Chart — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_create_gantt_palettes.htm&language=en_US&type=5"},
        {l:"Work in the Field Service Classic Dispatch Console Gantt — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_gantt.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Contractor Licensing",
      select:1,
      prompt:"A Company outsources 100 hours of weekly maintenance to an external Contractor. Jobs are assigned to a Contractor Manager instead of individual external Technicians. The Contractor Manager is in charge of updating Service Appointments and Work Orders upon completion. How should a Consultant implement the requirement?",
      options:[
        {k:"A", t:"Create the Contractor Manager as a Crew Service Resource."},
        {k:"B", t:"Create the individual Technicians as Service Crew Members."},
        {k:"C", t:"Set the individual Technicians as Capacity-Based Service Resources."},
        {k:"D", t:"Set the Contractor Manager as a Capacity-Based Service Resource."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Capacity-Based Resources are Salesforce's documented mechanism for exactly this scenario: "Typically, contractors in field service can work a specified amount in a given time period," and capacity is defined as either hours worked or a number of appointments in that period rather than a detailed individual calendar. Configuring the Contractor Manager as one Capacity-Based Service Resource lets that single record absorb the outsourced weekly hours as a pool of work, while the Contractor Manager — who is already the one updating Service Appointments and Work Orders on completion — is the single point of contact the system needs to track, exactly matching "assigned to a Contractor Manager instead of individual external Technicians."

**Why A is wrong.** A Crew Service Resource groups multiple named individual resources who work together simultaneously on one appointment — it's built for coordinated multi-person jobs, not for representing a manager absorbing an aggregate block of contracted hours.

**Why B is wrong.** This directly contradicts the requirement: the company explicitly does not want to track individual external Technicians — jobs go to the Contractor Manager, not to named crew members underneath them.

**Why C is wrong.** Same contradiction as B — making the individual Technicians the Capacity-Based Resources means the system is still tracking each of them individually, when the whole point of the requirement is that only the Contractor Manager is assigned work and reports back on it.`,
      sources:[
        {l:"Define Capacity-Based Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_define_resource_capacity.htm&language=en_US&type=5"},
        {l:"Create Service Resources for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Entitlements & Milestones",
      select:1,
      prompt:"Which fields on Service Appointments help ensure that they are completed within the agreed upon Service Level Agreement (SLA) with A Company's customers?",
      options:[
        {k:"A", t:"Earliest Start Permitted, Due Date"},
        {k:"B", t:"Arrival Window Start, Arrival Window End"},
        {k:"C", t:"Actual Start, Actual End"},
        {k:"D", t:"Scheduled Start, Scheduled End"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Salesforce's own field reference states this directly: "Earliest Start Permitted and Due Date typically reflect terms in the customer's service-level agreement." Earliest Start Permitted marks the earliest the work is allowed to begin, and Due Date marks the latest it must be completed — together they encode the SLA's compliance window, and scheduling/optimization logic (like SLA/violation work rules) checks candidate time slots against these two fields to keep appointments within the promised terms.

**Why B is wrong.** Arrival Window Start/End is a customer-facing convenience window — typically wider than the Scheduled Start/End "to allow time for delays and scheduling changes." It communicates when a technician might show up, but it isn't the field pair that encodes the underlying SLA commitment itself.

**Why C is wrong.** Actual Start/End simply record what really happened once the technician started and finished the job. They're a historical/reporting record captured after the fact — they don't constrain scheduling or "ensure" anything stays within SLA; they just document the outcome.

**Why D is wrong.** Scheduled Start/End represent the specific slot currently assigned to the appointment (their difference equals the Estimated Duration) — the output of the scheduling process, not the SLA boundary itself. A Scheduled window can still fall inside or outside the SLA depending on where it lands relative to Earliest Start Permitted and Due Date.`,
      sources:[
        {l:"Service Appointment Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_appointment_fields.htm&type=5"},
        {l:"Create and Manage Field Service Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=pfs_scheduling.htm&type=0"}
      ]
    },
    {
      topic:"Work Orders & Appointments",
      select:1,
      prompt:"A Company performs maintenance and repairs on Assets in the field and wants to increase first-time fix rates. What should a Consultant include when creating a Work Order?",
      options:[
        {k:"A", t:"Products Required and Estimated Duration"},
        {k:"B", t:"Products Required and Skill Requirements"},
        {k:"C", t:"Estimated Duration and Service Level Agreement"},
        {k:"D", t:"Skill Requirements and Products Consumed"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** First-time fix rate comes down to two things being true the moment the technician arrives: they have the right parts, and they're qualified to do the job. Products Required on the Work Order ensures the parts needed for that specific repair are identified and available (or transferred to the technician's van) before the visit, and Skill Requirements ensures only a technician with the necessary qualifications gets matched and dispatched to it. Together, these two fields are what keep a technician from showing up empty-handed or under-qualified — the two most common causes of a failed first visit.

**Why A is wrong.** Estimated Duration helps the scheduler avoid overlapping bookings and plan the day accurately, but it has no bearing on whether the technician actually has what's needed to complete the repair on the first attempt.

**Why C is wrong.** Service Level Agreement terms (via Earliest Start Permitted/Due Date) govern *when* the work must happen, not whether the visit succeeds once the technician is there — it's a timing constraint, not a readiness one.

**Why D is wrong.** Products Consumed is populated *after* the job, recording what parts were actually used — it's a retrospective record, not something set when creating the Work Order that could influence whether the first visit succeeds.`,
      sources:[
        {l:"Track Required Inventory in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_create_products_required.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Match Skills — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Preventive Maintenance",
      select:2,
      prompt:"A company wants to make it easier for Managers to monitor Preventative Maintenance Work Orders using the Dispatcher Console. Which two filtering options should Managers use to find the appropriate Work Orders? (Select all that apply)",
      options:[
        {k:"A", t:"The Dispatcher Console Map and filter the list to show only desired Service Appointments"},
        {k:"B", t:"The Dispatcher Work Order Polygon and filter the list to show only desired Service Appointments"},
        {k:"C", t:"The Preventative Maintenance Gantt and filter the list to show only desired Work Orders"},
        {k:"D", t:"The Dispatcher Console Appointment list and filter the list to show only desired Serviced Appointments"}
      ],
      correct:["A", "D"],
      explanation:
`**Why D is right.** The Appointment List is the panel built specifically for finding and narrowing down appointments — it lets users "filter them, such as viewing only unscheduled appointments," and supports custom filters on top of that. A Manager can filter it down to just the Service Appointments tied to Preventive Maintenance Work Orders directly from this list.

**Why A is right.** The Map view (an embedded map showing workforce location and appointments) also supports filtering "which mobile workers and records appear," letting a Manager narrow the map down to just the appointments they want to monitor — in this case, the ones generated from Preventive Maintenance Work Orders — while still getting the geographic context the list alone doesn't provide.

**Why B is wrong.** There's no "Dispatcher Work Order Polygon" feature. Polygons in Field Service define the geographic shape of a Service Territory on the map — they aren't a filtering tool for narrowing down Work Orders or appointments by type.

**Why C is wrong.** There's no distinct "Preventative Maintenance Gantt." The Dispatcher Console has one Gantt Schedule view (showing appointments, absences, breaks, and travel time) — it isn't a separate, maintenance-specific version of the Gantt, and filtering for Preventive Maintenance work happens through the Appointment List or Map, not a specialized Gantt.`,
      sources:[
        {l:"Working in the Field Service Classic Dispatch Console Appointment List — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_appointments_list.htm&language=en_US&type=5"},
        {l:"Explore Dispatcher Console: Gantt & Maps — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/explore-the-dispatcher-console"}
      ]
    },
    {
      topic:"Licensing",
      select:1,
      prompt:"A Company has enabled Salesforce Field Service and installed the managed package. A Company wants to ensure that Technicians can update their own Appointments' status using the Dispatcher Console Gantt Chart. Which steps should the Consultant take to meet these requirements?",
      options:[
        {k:"A", t:"Create Permission Sets and assign the Salesforce Field Service Mobile Permission Set to Service Resources."},
        {k:"B", t:"Create Permission Sets and assign the Salesforce Field Service Admin Permission Set to Service Resources."},
        {k:"C", t:"Create Permission Sets and assign the Salesforce Field Service Scheduling and Mobile Permission Sets to the Resource Profile."},
        {k:"D", t:"Create Permission Sets and assign the Salesforce Field Service Resource Permission Set and Scheduling License to each Technician."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** Two separate things need to line up here: the Field Service Resource Permission Set grants the actual object-level access (edit rights on Service Appointment) a technician needs to update a record's status, and the Scheduling Permission Set License is specifically what "grant[s] access to scheduling features such as Dispatcher Console or Optimization" — in other words, it's the license that unlocks the Dispatcher Console/Gantt itself. Assigning both to each Technician is what lets them open the Gantt Chart and update their own appointment's status there.

**Why A is wrong.** The Mobile Permission Set License unlocks the Field Service mobile app — not the Dispatcher Console. Since the requirement is specifically about updating status *via the Gantt Chart*, Mobile access alone doesn't get a Technician into the Dispatcher Console at all, and this option also lacks a permission set that grants edit rights on the appointment record.

**Why B is wrong.** Admin Permission Set grants broad administrative access to all Field Service objects, the Field Service Admin app, and underlying configuration — far more than a Technician needs just to update their own appointment status, and a clear violation of least-privilege for this role.

**Why C is wrong.** This pairs Scheduling with Mobile rather than with the Resource Permission Set. Mobile is the wrong license for Dispatcher Console access (it's for the mobile app), and this option never grants the object-level permission set (Resource Permissions) that actually lets a Technician edit a Service Appointment's status field.`,
      sources:[
        {l:"Create Field Service Permission Sets — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_get_started.htm&language=en_US&type=5"},
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"}
      ]
    },
    {
      topic:"Scheduling Policies",
      select:1,
      prompt:"A Company groups its technicians based on seniority. The newest techs comprise Tier 1, move to Tier 2 after a year on the job, and get assigned to Tier 3 after 3 years on the job. Resources with more seniority should be considered for a job over resources with less seniority. How should the Field Service Administrator ensure this corporate Policy is enforced considering the Customer First Scheduling Policy is utilize consistently except in emergency situations?",
      options:[
        {k:"A", t:"Create a queue for each tier group within each Territory on the Service Appointment object."},
        {k:"B", t:"Make a relevance group on the Work Rule filter based on the tier number and add the rule to the Policy."},
        {k:"C", t:"Use the Priority Field on the Service Resource assigning Tier 3 techs the lowest number and Tier 1 techs with the highest number."},
        {k:"D", t:"Create a custom number field to capture the tier number on the Service Resource."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Relevance groups exist precisely to apply a Work Rule (or Objective) to a filtered subset of resources based on a field value — in this case, the tier number. Creating a relevance group on a Work Rule filtered by tier, then adding that rule to the active Scheduling Policy, is what actually lets the engine weigh seniority when candidates are compared for a job, layering on top of the existing Customer First Policy rather than replacing it — so the corporate seniority rule and the customer-first approach can coexist, with room to bypass it for emergencies as a separate, higher-priority rule.

**Why A is wrong.** Queues are a Salesforce record-routing/ownership mechanism (used for things like Lead or Case assignment) — they aren't part of the Field Service scheduling/optimization engine and have no way to influence which resource the scheduler picks for an appointment.

**Why C is wrong.** There's no standard "Priority" field on Service Resource — Priority is a standard field on Service Appointment (used to prioritize which *appointments* get scheduled first), not a mechanism for ranking *resources* by seniority.

**Why D is wrong.** Creating the custom tier number field is a necessary building block, but a field with no rule referencing it has zero effect on scheduling by itself. The corporate policy only becomes enforced once that field is actually wired into a Work Rule (via a relevance group) that's added to the Scheduling Policy — which is what option B actually does.`,
      sources:[
        {l:"De-mystifying Salesforce Field Service Relevance Groups — Thunder", u:"https://www.thundersf.com/blog/de-mystifying-salesforce-field-service-relevance-groups"},
        {l:"Create and Manage Field Service Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=pfs_scheduling.htm&type=0"}
      ]
    },
    {
      topic:"Asset Lifecycle",
      select:1,
      prompt:"A Company wants to track the work that is performed on the customer's install base. Which Object Relationship should the Consultant utilize to meet this requirement?",
      options:[
        {k:"A", t:"Products to Accounts"},
        {k:"B", t:"Work Orders to Products"},
        {k:"C", t:"Work Orders to Assets"},
        {k:"D", t:"Assets to Products"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Asset is Salesforce's object for the specific pieces of equipment that make up a customer's install base, and Work Order carries a direct lookup to Asset. Salesforce's own guidance confirms assets "can be associated with various Salesforce records in addition to products," specifically "work orders or work order line items," and recommends adding a Work Orders related list to the Asset page layout — giving a full, queryable history of every job performed against that specific installed unit. That's exactly the "track the work performed on the install base" requirement.

**Why A is wrong.** Products relate to Accounts through the sales side (Opportunities, Orders) — showing what was sold to a customer in general, not tracking individual service work performed on a specific installed unit.

**Why B is wrong.** Work Order doesn't carry a direct relationship to the generic Product2 catalog object — Products connect at the line-item level (Products Consumed, Products Required), not as the object a Work Order is tracked against for install-base history.

**Why D is wrong.** Assets relate to Products through the Asset's Product lookup, which identifies *what catalog item* a given Asset represents — useful for knowing what was installed, but it says nothing about the work performed on it afterward.`,
      sources:[
        {l:"Track Customer Assets — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets"},
        {l:"WorkOrder — Object Reference for the Salesforce Platform", u:"https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_workorder.htm"}
      ]
    },
    {
      topic:"Complex Work & Dependencies",
      select:3,
      prompt:"A customer makes one Appointment for the Sales department, and another Appointment for the Service department. The two Appointments should be handled on the same day, but should be created as separate Appointments. In addition, the Technician must complete one Appointment before starting the next. The Agent wants to make sure these two Appointments are scheduled together in sequence. Which three things should the Consultant verify to ensure these requirements are met and simultaneous scheduling will occur? (Choose 3 answers)",
      options:[
        {k:"A", t:"The checkbox Use all-or-none Scheduling for related Appointments in Field Service Settings is selected."},
        {k:"B", t:"The Same Resource and Same Day fields appear on the Service Appointments Page Layout."},
        {k:"C", t:"A Dependency has been created between the two Appointments and the Start Times are the same."},
        {k:"D", t:"The Dependency Type is set to Start After Finish and Same Day on the first Service Appointment in the Dependency."}
      ],
      correct:["A", "B", "D"],
      explanation:
`**Why D is right.** Salesforce's Complex Work feature ships exactly four scheduling dependency types, and one is named, verbatim, "Start After Finish and Same Day" — documented as "one appointment can't start until the other is complete. Schedule both appointments for the same day." That is a precise match for the stated requirement: the Technician must finish the Sales Appointment before starting the Service Appointment (finish-to-start), and both must land on the same calendar day. That type is set on the dependency record on the first (predecessor) Appointment, pointing to the second (successor) Appointment.

**Why A is right.** Complex Work / scheduling dependencies are an opt-in capability — Field Service Settings has to be configured to activate dependency types and turn on complex work for the relevant service territories (which requires Enhanced Scheduling and Optimization) before the engine will honor any dependency record at all. Without confirming that related-appointment scheduling is switched on, the optimizer can schedule one Appointment (say, Sales) while leaving the other unscheduled or scheduled independently on a different day — defeating "scheduled together in sequence." Verifying this org-level setting is on is a prerequisite check, not an optional one.

**Why B is right.** Setting up dependencies is a page-layout change as much as a data change — Salesforce's own setup guidance for Complex Work starts with "update page layouts" before dependency types can be activated and used. The Consultant needs the relevant same-day/same-resource indicators exposed on the Service Appointment page layout so dispatchers and agents can actually see, at a glance, that the linked Appointments are tied together correctly rather than trusting an invisible backend relationship.

**Why C is wrong.** Creating a Dependency record between the two Appointments is necessary — but "Start Times are the same" describes the *Same Start* dependency type (appointments starting simultaneously, typically used when two different resources need to begin at once, e.g., sharing a tool). That directly contradicts this scenario, where the Technician must *complete* one Appointment before *starting* the next — a sequential, finish-to-start relationship, not a simultaneous one. Same Start is the wrong dependency type here, which is exactly why D (Start After Finish and Same Day) is the one that belongs on the record instead.`,
      sources:[
        {l:"Complex Work in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_complex_work.htm&language=en_US&type=5"},
        {l:"Create Dependencies Between Service Appointments — Salesforce Release Notes", u:"https://help.salesforce.com/s/articleView?language=en_US&id=release-notes.rn_fieldservice_246_complex_work_create_dependencies.htm&release=246&type=5"}
      ]
    },
    {
      topic:"Skills & Resource Matching",
      select:1,
      prompt:"A Company uses two contractors, Contractor 1 and Contractor 2, to perform repair work. Contractor 1 has provided Services for a Company for a longer period of time and is considered to have more repair work expertise than Contractor 2. How should the Consultant configure the Contractors' experience?",
      options:[
        {k:"A", t:"Assign Contractor 1 and 2 different Skill Levels for repair Work Type."},
        {k:"B", t:"Assign Contractor 1 and 2 different capacities for repair work."},
        {k:"C", t:"Assign Contractor 1 as Preferred Resource."},
        {k:"D", t:"Assign Contractor 2 as an Excluded Resource."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Skill Level is Salesforce's purpose-built field for exactly this: a numeric proficiency rating from 0 to 99.99 on a Service Resource's Service Resource Skill record. A Work Type's Skill Requirements related list can specify a required skill level for the repair work, and — critically — when the Match Skill Level field is enabled on the Match Skills work rule, "service appointments are only scheduled to service resources who have the same or higher skill level requirement." Giving Contractor 1 a higher Skill Level than Contractor 2 on the repair skill directly encodes "more expertise" as data the scheduling engine can rank and act on — e.g., routing the more demanding or higher-value repair jobs to the more experienced contractor while both remain eligible for the work in general.

**Why B is wrong.** Capacity (hours worked or number of appointments in a period) is how Field Service models *how much* work a Capacity-Based Resource can absorb — it's a throughput/availability measure, not a proficiency measure. Two contractors could have identical capacity and wildly different skill, or vice versa; capacity says nothing about who's more expert at repair work.

**Why C is wrong.** Preferred Resource is a service objective that biases scheduling toward a specific resource for a specific customer, account, or location relationship — it's about continuity/relationship preference (e.g., "this technician has worked this site before"), not a general statement that one contractor is more skilled than another across all repair work.

**Why D is wrong.** Excluded Resource is a hard block — it removes a resource from consideration for an appointment entirely. The company still wants Contractor 2 doing repair work, just with recognized lower proficiency than Contractor 1; excluding Contractor 2 would stop them from being scheduled at all, which isn't the requirement.`,
      sources:[
        {l:"Skill Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=fs_skill_fields.htm&language=en_US&type=5"},
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Skills & Resource Matching",
      select:2,
      prompt:"A Company would like the Technician who performed a customer's initial installation to also perform any subsequent service calls. Which two actions should the Field Service Administrator take to configure Field Service to ensure the installation technician is assign to subsequent service calls? (Select all that apply)",
      options:[
        {k:"A", t:"Add the Preferred Resource Service Objective to the Scheduling Policy."},
        {k:"B", t:"Add the Technician as a Preferred Resource on the Account record."},
        {k:"C", t:"Create a child Work Order for maintenance on the original installation Work Order."},
        {k:"D", t:"Add the Technician as the Required Resource on the Service Appointment."}
      ],
      correct:["A", "B"],
      explanation:
`**Why B is right.** Resource preferences are created from the Resource Preferences related list on an Account (or Work Order) — clicking New there lets the Administrator pick the Technician, set the preference Type to Preferred, and save it. That record is the actual data link that says "this technician belongs with this customer," and work orders and their line items inherit that preference from the related account. This is precisely how you'd record "the tech who did the install" against the customer's account for future reference.

**Why A is right.** A Preferred Resource record by itself doesn't move the scheduling engine — Salesforce's own guidance is explicit that "to set a preference for scheduling the service appointment to the specified resource, use the [Preferred] Resource service objective." Objectives are the weighted goals a Scheduling Policy optimizes toward (alongside things like ASAP and Minimize Travel), so without adding the Preferred Resource objective to the policy and giving it a weight, the preference record on the account is just inert data — it's never actually factored into which technician gets picked. Both steps together are what make the preference real: B creates the relationship, A makes the engine honor it.

**Why C is wrong.** Creating a child Work Order for maintenance under the original installation Work Order is a work-order-hierarchy/tracking decision — useful for reporting lineage between the install and later service work — but it has no mechanism that tells the scheduler which technician to assign. It doesn't touch resource preferences, work rules, or service objectives at all.

**Why D is wrong.** Required Resource is a hard constraint enforced through the Required Resources work rule, not a plain field set "on the Service Appointment" — and Salesforce's own documentation calls it "highly restrictive, because they limit the pool of potential assigned resources to consider only those who are listed as required." If the original installer is ever unavailable, sick, or overbooked, a Required Resource setup can leave the appointment unable to be scheduled at all. For a soft "we'd like the same tech when possible" business ask, the weighted Preferred Resource objective (A + B) is the documented, less brittle fit — Required is reserved for strict one-on-one relationships (e.g., home healthcare) where no substitute is acceptable.`,
      sources:[
        {l:"Add Service Resource Preferences in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=fs_resource_preferences.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Required Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_optimization_theory_work_rules_required_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Inventory Management",
      select:1,
      prompt:"An Inventory Manager at A Company wants to better understand the distribution of a critical and expensive part across all Inventory Locations as the part is reused and restocked. What should the Consultant leverage to meet this requirement?",
      options:[
        {k:"A", t:"Entitlement Plan"},
        {k:"B", t:"Product Item"},
        {k:"C", t:"Maintenance Plan"},
        {k:"D", t:"Assets"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Product Item is Salesforce's purpose-built junction record for exactly this: it represents "the stock of a particular product at a particular location," linking one Product2 and one inventory-designated Location, and it "can be associated only with inventory locations." If a part sits in three warehouses and two truck stock locations, that's five separate Product Item records — one per location — each maintaining "a quantity at the location that is updated automatically when inventory is transferred or consumed." That's precisely "distribution of a part across all Inventory Locations" as reuse and restocking happen: the Inventory Manager can report across Product Item records to see quantity-on-hand by location in real time.

**Why A is wrong.** Entitlement Plans define the level of support/SLA terms a customer is entitled to (response times, coverage windows) — they govern service commitments, not physical stock levels or where parts physically sit.

**Why C is wrong.** Maintenance Plans schedule recurring preventive-maintenance Work Orders against Assets on a cadence — they're about *when* service work should recur, not about tracking how much of a part exists at each warehouse or truck.

**Why D is wrong.** Assets represent specific installed or owned units of a product (e.g., the one pump installed at a customer site) — a record of what a customer has and its service history. It doesn't model quantity of a reusable, restockable part sitting in inventory across multiple locations; that's what Product Item is for.`,
      sources:[
        {l:"Field Service Inventory Management Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm"},
        {l:"Set Up Multiple Inventory Locations — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.mfs_products_multiple_locations.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:1,
      prompt:"A Company wants to identify which resources need more fewer Appointments. Which Gantt chart filter option should a Consultant recommend to provide this information?",
      options:[
        {k:"A", t:"Select Sort by Average Utilization on the Resources Tab."},
        {k:"B", t:"Select Travel Time and Breaks as skills on the Skills Tab."},
        {k:"C", t:"Select Hours, Absences and Overtime on the Utilization Tab."},
        {k:"D", t:"Select Date Resolution on the Hours Tab."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** This is a near-verbatim match to Salesforce's own instructions: "Click the Gantt filter icon, then click Resources. In the Sort by field, select Average Utilization" — documented as the way to "identify which resources need more or fewer appointments." Sorting the Resources tab by Average Utilization ranks every resource by how busy they are (Salesforce's formula: (Service Appointments + Absences + Breaks + Travel Time) / (Overtime Hours + Normal Hours)), instantly surfacing who's underbooked at the top and who's overloaded at the bottom — exactly the distribution question the company is asking.

**Why B is wrong.** Travel Time and Breaks aren't skills, and the Skills tab exists to filter which resources appear based on required competencies (e.g., only show electricians). There's no "select Travel Time and Breaks as skills" option — this answer misapplies a Utilization-calculation concept onto the wrong tab entirely.

**Why C is wrong.** The Utilization view does let you choose which factors (like Absences, Breaks, Overtime) feed into the utilization percentage shown per resource — that's configuring *how the number is calculated*, not a sort/filter that ranks resources so you can spot who needs more or fewer appointments. The actual "who needs work" answer comes from sorting by Average Utilization on the Resources tab, not from toggling calculation inputs on the Utilization tab.

**Why D is wrong.** Date Resolution on the Hours tab controls the Gantt's time-axis granularity — whether the chart displays in 15-minute increments, hourly, daily blocks, and so on. It changes how the calendar is drawn, not which resources are over- or under-booked.`,
      sources:[
        {l:"View Field Service Resource Utilization — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_view_availability.htm&language=en_US&type=5"},
        {l:"Filter the Gantt in Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_filter.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Work Order Lifecycle",
      select:2,
      prompt:"The CFO for A Company wants Work Orders to remain open until the Customer Service Report is signed. Which two configurations should a Consultant implement to prevent Work Orders from being closed? (Select all that apply)",
      options:[
        {k:"A", t:"Custom Work Order Status"},
        {k:"B", t:"Custom Validation Rule on Work Orders"},
        {k:"C", t:"Custom Work Order Escalation Rules"},
        {k:"D", t:"Custom Approval Process and Work Order"}
      ],
      correct:["A", "B"],
      explanation:
`**Why A is right.** Every Work Order Status maps to one of a fixed set of Status Categories — New, In Progress, On Hold, Completed, Cannot Complete, Closed, Canceled — and "adding a value to the Status field... creates a work order status record" that the admin then assigns to a category. A Consultant can add a custom status (e.g., "Awaiting Signature") mapped to the Completed category rather than Closed, giving technicians and dispatchers a distinct, visible state for "the work is done but the report isn't signed yet" — the record simply never reaches a Closed-category status on its own.

**Why B is right.** A custom status alone doesn't stop a user from manually picking a Closed-category status early — that's what the Validation Rule enforces. A rule that checks for the signature indicator (for example, whether a related, signed Service Report exists or a custom "Signed" checkbox/date is populated) and blocks the save with an error whenever someone tries to set the Work Order to a Closed status without it gives the CFO's requirement real teeth: the record is declaratively prevented from being saved as Closed until the condition is true, regardless of which user or process attempts it.

**Why C is wrong.** Escalation Rules aren't a Work Order feature at all — Salesforce's Escalation Rules are built specifically for the Case object (auto-reassigning or notifying based on case age/priority). There's no equivalent "Work Order Escalation Rule" mechanism to invent here; this option describes a feature that doesn't exist for this object.

**Why D is wrong.** An Approval Process routes a record through a defined chain of human approvers and is built for business decisions requiring sign-off (like a discount or a large PO), not for enforcing a simple "field X must be populated before status Y" data rule. It's heavier to build and maintain than necessary, and unlike a validation rule it doesn't stop someone from directly editing the Status field outside the approval flow — a validation rule is the standard, airtight way to guarantee the block Salesforce's declarative tools are built for.`,
      sources:[
        {l:"WorkOrderStatus — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorderstatus.htm"},
        {l:"Define Validation Rules — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=platform.fields_defining_field_validation_rules.htm&type=5"}
      ]
    },
    {
      topic:"Routing & Travel",
      select:3,
      prompt:"Which three factors should a Consultant consider when configuring routing? (Select all that apply)",
      options:[
        {k:"A", t:"Configure the Resource Availability Work Rule to calculate Travel at the expense of the Resource and breaks."},
        {k:"B", t:"A straight line is used to compute the shortest distance between two Locations if Street Level Routing is enabled."},
        {k:"C", t:"Default Travel Speed is used only if a different travel speed is null on the Resource."},
        {k:"D", t:"Configure Scheduling Policy by modifying Work Rules and Service Objectives."}
      ],
      correct:["A", "C", "D"],
      explanation:
`**Why C is right.** This is documented almost word for word: Default Travel Speed "is used for aerial routing calculations, unless a value is set directly on the service resource object, in which case this value supersedes the default." In other words, the org-wide Default Travel Speed is only the fallback — the moment a specific resource has its own travel speed populated, that resource-level value wins. A Consultant configuring routing needs to know this precedence to predict whose travel time estimates come from which setting.

**Why A is right.** The Service Resource Availability work rule is exactly where travel-vs-work-time tradeoffs get configured: its Travel From Home and Travel To Home (minutes) fields are documented as "the number of minutes that the resource has available for travel before the start of the work day (at the resource's expense)," and the same rule also defines break behavior (Fixed Gap, Minimum Gap, Break Start/Duration). A Consultant has to tune these so travel before/after the shift and lunch breaks are handled the way the business wants — company time vs. the resource's own time — since leaving them blank (without Enhanced Scheduling and Optimization) allows unlimited travel outside working hours.

**Why D is right.** Routing behavior isn't just a global toggle — it's shaped by whichever Work Rules and Service Objectives are active in the Scheduling Policy actually being used (e.g., a Minimize Travel objective, or travel-related work rules). Two territories running different scheduling policies can route very differently even with identical travel settings, so reviewing and modifying the policy's rules and objectives is a core part of configuring routing.

**Why B is wrong.** This has it backwards. Salesforce's routing documentation is explicit: when Street Level Routing is *disabled*, Field Service falls back to aerial routing — "travel time is calculated by using the straight-line distance between the two points." When Street Level Routing *is* enabled, it instead "computes the average travel time it takes to drive from point to point based on car travel by road," which is real road-network routing, not a straight line. So the straight-line calculation is what happens when Street Level Routing is off, the opposite of what this option claims.`,
      sources:[
        {l:"Set Up Routing for Travel Time Calculations — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_streetlevelrouting.htm&language=en_US&type=5"},
        {l:"Work Rule Type: Service Resource Availability — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_service_resource_availability.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:2,
      prompt:"Service Resources at A Company frequently work in more than one Service Territory. The current Scheduling Policy looks only at Primary Territory. While A Company still wants the optimizer to use the Service Resource's Primary Territory when scheduling, A Company also wants the Scheduling Policy to look at the Resource's Secondary Service Territories. Which two Scheduling Policy changes should a Consultant recommend? Choose two answers",
      options:[
        {k:"A", t:"Include the Match Territory Work Rule."},
        {k:"B", t:"Remove the Match Territory Work Rule."},
        {k:"C", t:"Deselect Working Location Enable Primary on the Working Territories Work Rule."},
        {k:"D", t:"Select Working Location Enable Primary on the Working Territories Work Rule."}
      ],
      correct:["B", "D"],
      explanation:
`**Why B is right.** A policy that "looks only at Primary Territory" is a signature of the Match Territory work rule — a hard-boundary rule that matches appointments to resources using only their Primary (or Relocation) service territory membership, with no concept of secondary territories at all. Salesforce's own documentation is explicit that you "cannot combine Working Territories and Match Territory rules for the same dataset in a single scheduling policy" — the two are mutually exclusive. To get secondary-territory awareness at all, the Match Territory rule has to come out of the policy first.

**Why D is right.** The Working Territories work rule is what natively "enforces primary and secondary service territory memberships" — but by default it "considers only secondary territories." Since A Company wants the optimizer to keep using Primary Territory too (not switch to secondary-only), the Consultant must explicitly select Working Location Enable Primary on that rule — documented as: "If you want the optimizer to consider the primary territory as well, select Working Location Enable Primary on the work rule." That single checkbox is what extends coverage from secondary-only to both.

**Why A is wrong.** Adding (or keeping) Match Territory does the opposite of what's needed — it enforces a hard Primary/Relocation-only boundary and structurally cannot coexist with Working Territories in the same policy, so it would block secondary territories from ever being considered.

**Why C is wrong.** Deselecting Working Location Enable Primary leaves the Working Territories rule at its default behavior — secondary territories only. That would drop Primary Territory out of scheduling entirely, contradicting A Company's requirement to keep using it.`,
      sources:[
        {l:"Work Rule Type: Working Territories — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_optimization_theory_work_rules_working_territories.htm&language=en_US&type=5"},
        {l:"Territory Planning — Work Rules, Scheduling Policy and Match Territory Best Practices — Asperii", u:"https://www.asperii.com/blog/territory-planning-work-rules-scheduling-policy-and-match-territory-best-practices/"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:1,
      prompt:"A Company wants to ensure that Service Appointments are dispatched to Resources from the same Service Territory only. How can this be configured?",
      options:[
        {k:"A", t:"Include the Match Territory Work Rule in the Scheduling Policy."},
        {k:"B", t:"Ensure the Resource's Address is the same Territory as the Service Appointments."},
        {k:"C", t:"Include the Resource Availability Work Rule in the Scheduling Policy."},
        {k:"D", t:"Mark the Service Territory's Resources as Required on the Service Appointments."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** Match Territory is a database-level work rule built specifically to enforce this hard boundary: it "compares the Service Territory field value on service appointments with the Service Territory field value on service territory member records," ensuring "service appointments are assigned only to Field Service resources who are primary or relocation members of the appointment's service territory." Adding it to the Scheduling Policy is the documented, declarative way to guarantee resources from other territories are never even considered as candidates.

**Why B is wrong.** A resource's home address is just personal data — Field Service doesn't derive territory eligibility by geocoding where someone lives against a territory boundary at scheduling time. Territory membership is a real, queryable relationship (the Service Territory Member object, with Primary/Secondary/Relocation types), and it's that relationship — not the street address on the resource's record — that any work rule actually checks.

**Why C is wrong.** The Resource (Service Resource) Availability work rule governs working hours, breaks, and travel-before/after-shift time — it ensures a resource is *available* at the right time, but it has no concept of Service Territory at all, so it does nothing to stop a resource in one territory from being dispatched into another.

**Why D is wrong.** "Required Resource" is a per-appointment preference for one specific named resource (via a Resource Preference record), not a bulk mechanism for saying "everyone who's a member of this territory." There's no feature to mark an entire territory's roster as Required on an appointment — and even if there were, it wouldn't scale as a way to keep dispatching within-territory.`,
      sources:[
        {l:"Work Rule Type: Match Territory — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_optimization_theory_work_rules_match_territory.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Sharing & Visibility",
      select:3,
      prompt:"Org-Wide Default sharing is set to Private in a Salesforce Org. If the Field Service Lightning User Territory feature is enabled, which three objects will be visible to users who are part of the User Territory? Choose 3 answers",
      options:[
        {k:"A", t:"Service Resources"},
        {k:"B", t:"Work Orders"},
        {k:"C", t:"Resource Absences"},
        {k:"D", t:"Accounts"}
      ],
      correct:["A", "B", "D"],
      explanation:
`**Why A and B are right.** Salesforce's own sharing documentation names the exact scope of this mechanism: it's built to "limit default access to core Field Service objects (Work Order, Work Order Line Item, Service Appointment, Service Resource, Service Territory)." When a User Territory record is created for a user, that user is added to the Public Group tied to the territory, and that group is granted access to the Service Resources and Work Orders (along with Work Order Line Items and Service Appointments) associated with that Service Territory. Both A and B fall squarely inside that documented core list.

**Why D is right.** Sharing doesn't stop at the core objects — Salesforce explicitly extends it upward to related data: "When a service appointment with that territory is shared, associated parent records (such as accounts, assets, opportunities, work orders, and work order line items) are also shared." So once a Service Appointment is visible to a territory member, its parent Account comes along with it, giving the dispatcher the customer context they need without a separate sharing rule.

**Why C is wrong.** Resource Absence isn't part of this documented sharing chain — the territory-based Public Group mechanism is scoped to the core Field Service objects and the parent records pulled in through a shared Service Appointment, and Resource Absence doesn't appear in either list. A user's absence visibility has to come from another access path (e.g., role hierarchy, a separate sharing rule, or the resource's own record access), not automatically from User Territory membership.`,
      sources:[
        {l:"Limit Access to Field Service Records — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_sharing.htm&language=en_US&type=5"},
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Maintenance Plans",
      select:2,
      prompt:"A Company requires trained inspector to make three site visits per year to inspect containers at customer sites. These visits must be created 14 days before ne next suggested inspection date. What are two ways a Consultant can configure Maintenance Plans to meet the requirement? Choose 2 answers",
      options:[
        {k:"A", t:"Auto-generate Work Orders with a 14 day Generation Time frame."},
        {k:"B", t:"Associate a Work Type called Site Visit to a Maintenance Plan."},
        {k:"C", t:"Associate a Required Skill called Site Visit to a Maintenance Plan."},
        {k:"D", t:"Auto-generate Work Orders with a 14 day Generation Horizon."}
      ],
      correct:["B", "D"],
      explanation:
`**Why D is right.** Generation Horizon (Days) is the exact field for this lead-time requirement — Salesforce defines it as: "The next batch of work orders is generated this number of days before the maintenance plan's Date of the first work order in the next batch [the Next Suggested Maintenance Date]." Setting Generation Horizon to 14 means the batch job creates the upcoming inspection's Work Order (and, depending on settings, its Service Appointment) exactly 14 days ahead of the next suggested inspection date — precisely what "created 14 days before the next suggested inspection date" is asking for.

**Why B is right.** Work Type is a real, first-class field on Maintenance Plan ("The associated work type"), and it's what stamps every auto-generated Work Order with the correct template — duration, description, skill requirements, and pricing that belong to a container inspection. Associating a "Site Visit" Work Type to the plan ensures each of the three yearly generated Work Orders is correctly typed as a site-visit inspection rather than a generic, unconfigured record.

**Why A is wrong.** Generation Timeframe is a real field too, but it controls something different: "how far in advance work orders are generated in each batch" — i.e., the total span of future work orders created in one generation run (say, a year's worth at once), not how many days before an individual suggested date a batch fires. Setting it to 14 days wouldn't create lead time before the inspection date; it would just make each generation batch only look 14 days into the future, which doesn't match the requirement.

**Why C is wrong.** Maintenance Plan has no "Required Skill" association field. Skill requirements for the generated work flow through the Work Type (option B) or get added directly on the resulting Work Order — there's no separate "Required Skill" relationship configured at the plan level the way this option describes.`,
      sources:[
        {l:"Maintenance Plan Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_maintenance_fields.htm&language=en_US&type=5"},
        {l:"Guidelines for Generating Work Orders from a Maintenance Plan — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_generate_work_orders_plan.htm&type=5"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:1,
      prompt:"A Company wants Technicians to view work progress through the Work Order Line Item card in the Salesforce Field Service Mobile App. Which configuration steps should a Consultant take to meet this requirement?",
      options:[
        {k:"A", t:"Add the Work Order Line Items related List to the Work Order Page Layout and assign the Layout to the Technician's profile."},
        {k:"B", t:"Create a Report Chart that summarizes Work Order Line Items and add a link to the Service Appointment Layout."},
        {k:"C", t:"Create a custom Visualforce Page and add an external linin the Salesforce Field Service Mobile App to view the page in the mobile browser."},
        {k:"D", t:"Create a Custom Lightning component that displays Work Order progress and deploy it to Technicians through the Salesforce Field Service Mobile App."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The Work Order Line Item card is a native, out-of-the-box card in the Field Service Mobile App — Salesforce's own documentation confirms it renders directly "on work orders and work order line items" and that customizing it (e.g., adding quick actions) is done by adding to "the work order page layout," the same declarative page layout used across Salesforce. Since the mobile app mirrors whatever's configured on the record's assigned Page Layout, adding the Work Order Line Items related list there — and making sure the Technician's profile is assigned that layout — is what actually surfaces the line items (and their progress/status fields) in the card technicians see on their devices. No code is required; it's standard Setup configuration.

**Why B is wrong.** Report Charts are a Salesforce reporting feature meant for dashboards and record-detail summaries in the full Salesforce UI — they don't render inside the Field Service Mobile App's native Work Order Line Item card, and linking one onto the Service Appointment layout doesn't put line-item progress into the card the technician is actually looking at.

**Why C is wrong.** A Visualforce page opened via an external link forces the technician out of the native mobile card experience and into an embedded mobile browser — clunky, harder to maintain, and it doesn't produce "the Work Order Line Item card" the requirement specifically asks for; it produces a separate, bolted-on web view.

**Why D is wrong.** Building and deploying a custom Lightning component is real, supported extensibility for the Field Service Mobile App — but it's unnecessary engineering effort for something the native Work Order Line Item card already does out of the box via page layout configuration. Reaching for custom development when a declarative related-list-on-layout change meets the requirement isn't the recommended approach.`,
      sources:[
        {l:"Let Users Create Work Order Line Items in the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=mfs_wo_line_item.htm&language=en_US&type=5"},
        {l:"Work Order Line Item Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.wo_line_item_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:3,
      prompt:"The Dispatcher at A Company wants to schedule Service Appointments from the Dispatch Console while taking the Scheduling Policy into consideration. Which three options are available for the Dispatcher? (Select all that apply)",
      options:[
        {k:"A", t:"Select a Service Appointment from the list, use the \"Candidates\" action, and select the best Time Slot."},
        {k:"B", t:"Select a Service Appointment from the list, use the \"Change Status\" action and \"Dispatch\"."},
        {k:"C", t:"Select multiple Service Appointments from the list and bulk schedule them."},
        {k:"D", t:"Select a Service Appointment from the list and use the \"Schedule\" action."}
      ],
      correct:["A", "C", "D"],
      explanation:
`**Why A and D are right.** Both the Schedule action and the Candidates action run the appointment through the active Scheduling Policy's work rules and service objectives — Salesforce's own guidance draws the line precisely here: "If you schedule an appointment using the Schedule or Candidates actions, you won't see any rule violations." Schedule automatically books the single best-ranked slot the policy finds; Candidates instead shows the dispatcher a ranked list of qualified resources/time slots (filtered by things like required skills) so they can pick among policy-compliant options themselves. Either way, the Scheduling Policy is what's doing the matching.

**Why C is right.** The Appointment List supports the same automatic scheduling on a multi-selection: a dispatcher can "select the desired appointments," open the Actions menu, and choose Schedule to "execute an automatic scheduling process for the selected appointments." It's the same policy-driven Schedule logic as option D, just applied to a batch of appointments at once instead of one at a time.

**Why B is wrong.** Change Status → Dispatched is a manual workflow transition, not a scheduling action — it only checks that the target status is "permitted in your service appointment workflow settings." It doesn't run the appointment against any Scheduling Policy at all; it simply flips the status field on an appointment that (presumably) has already been assigned some other way, which is the opposite of what "taking the Scheduling Policy into consideration" requires.`,
      sources:[
        {l:"Manage Service Appointments — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments"},
        {l:"Working in the Field Service Classic Dispatch Console Appointment List — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_appointments_list.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:1,
      prompt:"A Company wants their Technicians to create an additional visit to complete unfinished work within the Salesforce Field Service Mobile Application. Which approach should a Consultant recommend to meet the requirement?",
      options:[
        {k:"A", t:"Define a Quick Action that creates a new Work Order record."},
        {k:"B", t:"Define a Quick Action that creates a new Service Appointment record."},
        {k:"C", t:"Define a Visualforce Page that creates a new Work Order record."},
        {k:"D", t:"Define a Visual force Page that creates a new Service Appointment record."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** An "additional visit" for the same job is, by definition, another Service Appointment — Salesforce's own documentation confirms "you can have multiple service appointments (visits) per work order, depending on the nature of the job." Nothing about the underlying Work Order (the job, its Products Required/Consumed, line items, asset, account) has changed; only the fact that it now needs a second trip. A Quick Action is exactly the tool built for this in the mobile app — Salesforce's Field Service Mobile App guide walks through creating a "Create a Record" quick action and adding it to a record's overview screen so technicians can generate a new, related record (here, a follow-up Service Appointment) without leaving the app or waiting on a dispatcher.

**Why A is wrong.** Creating a brand-new Work Order for unfinished work severs the connection to the original job — the new record wouldn't automatically carry over the original Work Order's line items, products required/consumed, asset association, or history, and would show up as an unrelated, duplicate job rather than a continuation of the one the technician is already on. The correct object to add is a Service Appointment against the *existing* Work Order, not a second Work Order.

**Why C and D are wrong.** Both propose a Visualforce Page, which is the wrong tool for the modern Field Service Mobile App regardless of which object it targets. The mobile app is built around native, declarative Quick Actions on record page layouts; a Visualforce page would have to be opened as a bolted-on external web view, adding development and maintenance overhead for something a standard Quick Action already handles out of the box. (D also asks for the right object — Service Appointment — but through the wrong, unnecessarily heavy mechanism.)`,
      sources:[
        {l:"Create Quick Actions for the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_quick_actions.htm&language=en_US&type=5"},
        {l:"Create Service Appointments for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_appointments.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:1,
      prompt:"A Company technicians use the Field Service Mobile Application exclusively since they are always in the field. Due to frequent schedule changes, how should the Field Service Administrator ensure this requirement is met?",
      options:[
        {k:"A", t:"Set up to auto dispatch one Work Order for each technician at a time."},
        {k:"B", t:"Enable drip feed to dispatch one Service Appointment per technician at a time."},
        {k:"C", t:"Set Send Appointment Notifications on Dispatch in the mobile settings to one."},
        {k:"D", t:"Instruct the dispatcher to only dispatch one Work Order to each technician at a time."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Drip Feed is Salesforce's purpose-built feature for exactly this scenario: "When your schedule changes frequently, drip feed helps to prevent confusion because it waits to dispatch another appointment until the current one is complete." It's configured in the Field Service Admin app under Field Service Settings → Dispatch → Drip Feed, where the Administrator sets "the default number of appointments to drip feed" — setting that value to one means each technician's mobile queue only ever shows a single dispatched Service Appointment, and drip feed automatically pushes the next one the moment the current one completes. That's a scalable, automated, system-level solution built specifically for mobile-only technicians dealing with a schedule that keeps shifting underneath them.

**Why A is wrong.** Drip feed dispatches at the Service Appointment level, not the Work Order level — there's no native "auto dispatch one Work Order at a time" mechanism, and a Work Order can have multiple appointments, so gating by Work Order wouldn't reliably produce "one appointment visible at a time" in the mobile queue anyway.

**Why C is wrong.** A notification-count setting only affects how many push/alert messages a technician receives when appointments are dispatched — it doesn't limit how many appointments are actually pushed into the technician's queue, so it wouldn't reduce the confusion caused by a full, frequently-reshuffled schedule sitting in the app.

**Why D is wrong.** Relying on the dispatcher to manually enforce a one-at-a-time rule is a process instruction, not a system configuration — it's unreliable at scale, easy to forget under time pressure, and doesn't use the automated Drip Feed capability Salesforce already provides for this exact problem. A Consultant should recommend the declarative, self-enforcing setting instead of a manual workaround.`,
      sources:[
        {l:"Drip Feed Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatch_drip_feed.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Inventory Management",
      select:2,
      prompt:"Which two reports should a Consultant build to track the number of parts used by a Technician during a given time period? (Select all that apply)",
      options:[
        {k:"A", t:"Service Appointment Inventory"},
        {k:"B", t:"Work Order Inventory"},
        {k:"C", t:"Products Consumed on Work Orders"},
        {k:"D", t:"Product Consumed on Work Order Line Items"}
      ],
      correct:["C", "D"],
      explanation:
`**Why C and D are right.** Parts a technician uses are tracked on the Products Consumed object, and it's deliberately built with two separate lookups — WorkOrderId ("work order that the product was consumed for") and WorkOrderLineItemId ("work order line item that the product was consumed for") — so a org can log consumption at whichever level fits its process: "track product consumption at the line item level if you want to know which products were used for each line item's tasks," or at the header level for simpler work orders. Because a given Products Consumed record may be tied to only one of those two parents, a Consultant needs both reports — one built on the Work Order relationship (C) and one on the Work Order Line Item relationship (D) — to catch every part a technician logged, however their org records it, filtered to the technician and date range in question.

**Why A is wrong.** Service Appointment has no direct relationship to Products Consumed at all — parts used are recorded against the Work Order or Work Order Line Item, not the appointment record, so there's no "Service Appointment Inventory" report type that would surface this data.

**Why B is wrong.** "Inventory" describes stock on hand (Product Item, tracked per Inventory Location) — the opposite of what's being asked. The requirement is about parts *consumed* by a technician over time, which is a usage/history question answered by Products Consumed reports, not a stock-level report.`,
      sources:[
        {l:"ProductConsumed — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productconsumed.htm"},
        {l:"Field Service Inventory Management Data Model — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm"}
      ]
    },
    {
      topic:"Licensing & Permissions",
      select:1,
      prompt:"A Company has dispatchers who can set up new territories, define new Scheduling Policies, and control settings on the Gantt chart. In addition to Field Service Lightning Dispatcher Permissions and the Field Service Dispatcher License, which permissions should a Consultant assign to the dispatchers?",
      options:[
        {k:"A", t:"Field Service Lightning Scheduling License"},
        {k:"B", t:"Field Service Lighting Admin Permissions"},
        {k:"C", t:"Field Service Lightning Standard Permissions"},
        {k:"D", t:"Field Service Lightning Mobile License"}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Configuring new Service Territories, Scheduling Policies, and Gantt settings are org-configuration tasks that live in the Field Service Admin app — access Salesforce reserves for the Field Service Admin permission set, documented as letting users "access and manage all Field Service objects, including the Field Service Admin app." The Dispatcher permission set and Dispatcher license only cover operating the Dispatch Console day to day (viewing the Gantt, running Get Candidates, scheduling appointments) — they don't include rights to create or edit the underlying setup records these dispatchers also need to touch. Layering Admin Permissions on top of their existing Dispatcher access is exactly how Salesforce documents giving a user both operational and configuration capability.

**Why A is wrong.** Field Service Scheduling is a permission set *license*, not a configuration permission set — it "allows the user to be shown on the Classic Dispatch Console Gantt and included in scheduling and optimization," meaning it's what makes a mobile worker/technician schedulable. It has nothing to do with granting rights to build territories or policies.

**Why C is wrong.** There's no "Field Service Lightning Standard Permissions" permission set in the managed package. "Field Service Standard" is a base user permission every Field Service user needs just to use the product at all — it isn't an elevated, admin-configuration-granting permission set.

**Why D is wrong.** Field Service Mobile is the license that "provides access to the Field Service mobile app" for field technicians — it's about letting someone log into the mobile app on their device, completely unrelated to back-office configuration of territories, scheduling policies, or the Gantt.`,
      sources:[
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"},
        {l:"Create Field Service Permission Sets — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_get_started.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Field Service Fundamentals",
      select:1,
      prompt:"A Company Technicians handle different kinds of jobs, many of which involve installing or replacing parts. Having the appropriate inventory is critical to completing the jobs on time. How should the Field Service be configured to ensure the parts required for a job are listed correctly on the Work Order?",
      options:[
        {k:"A", t:"Add the Product Fields to the Work Order Layout."},
        {k:"B", t:"Ensure the Product Items are available in Inventory."},
        {k:"C", t:"Include the Required Products in the Work Type."},
        {k:"D", t:"Create a Flow to add the Products to the Work Order."}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce documents this exact inheritance mechanism: "Work orders and work order line items inherit their work type's required products. For example, if all light bulb replacement jobs require a ladder and a light bulb, add the ladder and light bulb as required products to your Light Bulb Replacement work type... applying that work type to the work order adds the required products." Since Technicians "handle different kinds of jobs," each with its own typical parts list, defining Products Required once per Work Type is the standard, scalable, no-code way to guarantee the correct parts show up on every Work Order of that job type — automatically and consistently.

**Why A is wrong.** Adding product-related fields to the Work Order page layout only changes what's *visible* on the record — it doesn't determine *which* parts get listed. Layout changes are a display concern, not a data-population mechanism.

**Why B is wrong.** Product Item availability in inventory answers a different question — whether the required part is actually in stock at a location — not which parts are required for the job in the first place. A part can be correctly listed as required on a Work Order regardless of whether any Product Item currently has stock; that's a fulfillment/logistics concern layered on top of the requirement itself.

**Why D is wrong.** Building a custom Flow to add products to Work Orders means writing and maintaining custom automation to reproduce logic the Work Type's native Products Required inheritance already provides out of the box. Reaching for custom development when a standard, declarative relationship solves the problem isn't the recommended approach.`,
      sources:[
        {l:"ProductRequired — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_productrequired.htm"},
        {l:"Create Work Types for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_create_work_types.htm&type=5"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:2,
      prompt:"Which two features on the Dispatcher Console should the Consultant use to visualize Rule Violating Service Appointments? Choose 2 answers",
      options:[
        {k:"A", t:"Gantt Map"},
        {k:"B", t:"Color Palettes"},
        {k:"C", t:"Appointment List"},
        {k:"D", t:"Gantt"}
      ],
      correct:["C", "D"],
      explanation:
`**Why D is right.** The Gantt is the primary, documented surface for spotting rule violations: "If a rule violation occurs, the service appointment appears on the Gantt with a yellow triangle. Hover over the appointment to view its details and violated rules." A dispatcher scanning the Gantt can immediately pick out any appointment breaking a work rule by that triangle icon without opening anything else.

**Why C is right.** The Appointment List surfaces the same information in list form, and does so even more directly: "Regardless of the appointment list color-coding setting, appointments with rule violations are highlighted in the appointment list in yellow and in-jeopardy appointments are highlighted in red." It also ships a dedicated "Rules Violating" filter — "service appointments that have rule violations and aren't canceled" — letting a dispatcher isolate every problem appointment in one view, plus a "Check Rules" mass-edit action to validate a whole batch at once.

**Why A is wrong.** The Gantt Map is a geographic view — plotting appointment/resource locations on a map for routing and proximity context. It isn't documented as carrying a rule-violation indicator; that visualization work happens on the Gantt itself and the Appointment List.

**Why B is wrong.** Color Palettes are a general-purpose color-coding tool a Consultant configures against any Service Appointment field (priority, revenue, status, etc.) for visual customization — they aren't the built-in mechanism Salesforce uses to flag rule violations. Violations get their own dedicated yellow-triangle/yellow-highlight treatment independent of whatever Palette is active.`,
      sources:[
        {l:"Check Rule Violations on the Field Service Gantt — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_violations.htm&language=en_US&type=5"},
        {l:"Working in the Field Service Dispatcher Console Appointment List — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_appointments_list.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Licensing & Permissions",
      select:1,
      prompt:"A Company is adding Field Service Schedule Optimization to its Field Service implementation. Which Licensing will be required for the Field Service Schedule Optimization user?",
      options:[
        {k:"A", t:"Dispatcher License"},
        {k:"B", t:"Resource License"},
        {k:"C", t:"Salesforce License"},
        {k:"D", t:"Scheduling License"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** Salesforce's own setup guidance for activating Schedule Optimization is explicit and literal: "Setting up optimization consumes one Salesforce license, so check that a license is available." The Optimization "user" isn't a person clicking around the Dispatch Console — it's a dedicated system/integration user account that the background optimization batch job runs as. Because that account only needs to exist in the org to own and execute the scheduled optimization process, it's provisioned with a standard Salesforce license, not one of the Field Service managed-package permission set licenses.

**Why A is wrong.** Dispatcher License is what a human dispatcher needs to operate the Dispatch Console day to day — view the Gantt, run Get Candidates, trigger Schedule/Optimize actions interactively. The Optimization user isn't a dispatcher logging in and working the console; it's the background account the optimization job executes under, so it doesn't need this license.

**Why B is wrong.** There's no Field Service license actually called "Resource License." Field service technicians/resources are licensed via the Field Service Scheduling permission set license (so they can appear on the Gantt and be included in scheduling), not a "Resource License" — this option names a feature that doesn't exist under that name.

**Why D is wrong.** Field Service Scheduling license is what makes a mobile worker/technician schedulable — "shown on the Classic Dispatch Console Gantt and included in scheduling and optimization." That's the license for the resources *being* optimized, not the account that runs the optimization job itself.`,
      sources:[
        {l:"Get Ready for Field Service Scheduling and Optimization — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_customization.htm&language=en_US&type=5"},
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"}
      ]
    },
    {
      topic:"Skills & Resource Matching",
      select:1,
      prompt:"Technicians earn certifications that must be renewed periodically to ensure their skills remain up to date. How can these certifications be managed on the Resource?",
      options:[
        {k:"A", t:"Add the Resource Skill and create Absence once expired."},
        {k:"B", t:"Add the Resource Skill and remove from the Service Territory once expired."},
        {k:"C", t:"Add the Resource Skill and track certification using reminder."},
        {k:"D", t:"Add the Resource Skill and set the End Date."}
      ],
      correct:["D"],
      explanation:
`**Why D is right.** This is Salesforce's documented, purpose-built mechanism, described using almost this exact scenario: "if a service resource must be recertified in a particular skill every six months, you can enter an end date that's six months later than the start date." The Resource Skill record carries its own Start Date and End Date, so a certification that needs periodic renewal is modeled directly — once the End Date passes, that skill record is no longer currently effective, which is exactly the declarative, no-code way to represent "this qualification has expired and needs renewing."

**Why A is wrong.** Resource Absence models time the resource is unavailable to work at all (vacation, sick leave, training) — it has nothing to do with one specific skill lapsing. Creating an Absence would incorrectly take the technician off the schedule entirely instead of simply removing their eligibility for jobs requiring that one certification.

**Why B is wrong.** Removing a resource from their Service Territory is a drastic, unrelated action — it would block them from being dispatched to *any* work in that territory, not just work requiring the expired skill. It also doesn't reflect that the certification could be renewed and the resource re-qualified without re-adding territory membership from scratch.

**Why C is wrong.** "Tracking with a reminder" isn't a real, system-enforced Field Service mechanism — it describes a manual, human process (someone remembering to follow up) rather than data the scheduling and skill-matching engine actually reads. The Resource Skill's own End Date field is what the platform checks automatically; a reminder is not.`,
      sources:[
        {l:"Assign Skills with Start and End Dates to Service Resources — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.ls_assign_skills_with_end_date.htm&language=en_US&type=5"},
        {l:"Skill Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=fs_skill_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Scheduling & Dispatch",
      select:1,
      prompt:"The service director at A Company would like to understand the effect that service objectives have on the assignment of Service Appointments to Service Resources. Where can the director view Service Objective scores for potential appointment time slots?",
      options:[
        {k:"A", t:"Dispatch Console"},
        {k:"B", t:"Candidates Action"},
        {k:"C", t:"Book Appointment Action"},
        {k:"D", t:"Bulk Dispatch Action"}
      ],
      correct:["C"],
      explanation:
`**Why C is right.** The Book Appointment action is specifically documented as ranking *time slots*, not people: it "displays a list of ranked time slots" for booking, and each slot is graded — Golden, Recommended, or Satisfactory — derived directly from "the weighted service objectives set in your scheduling policy." That's an exact match for what the director wants to see: how the active scheduling policy's service objectives (ASAP, Minimize Travel, Preferred Resource, etc.) translate into a visible quality score for each candidate appointment time.

**Why B is wrong.** The Candidates action ("Get Candidates") ranks *resources* — "a list of ranked candidates who can perform the job" — filtered and ordered by qualification and policy fit. It's the people-facing counterpart to Book Appointment's slot-facing view; the question specifically asks about scores for *time slots*, which is Book Appointment's job, not Candidates'.

**Why A is wrong.** The Dispatch Console is the broader workspace containing the Gantt, maps, and appointment list — it's where a dispatcher works day to day, but it isn't itself the feature that grades time slots against service objectives; that grading happens within the Book Appointment (and Candidates) actions, not as a standalone Dispatch Console view.

**Why D is wrong.** Bulk Dispatch is about pushing multiple already-assigned appointments to resources at once — an operational dispatching action, not a scoring or ranking mechanism tied to service objectives at all.`,
      sources:[
        {l:"Effective Appointment Scheduling Techniques — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/update-a-schedule"},
        {l:"AppointmentBookingSlot Class — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/apex_class_FSL_AppointmentBookingSlot.htm"}
      ]
    },
    {
      topic:"Scheduling & Dispatch",
      select:2,
      prompt:"A Company wants to increase customer satisfaction by committing Preferred Resources to Accounts and providing prompt service. Which two default Scheduling Policies meet this requirement. (Select all that apply)",
      options:[
        {k:"A", t:"Customer First"},
        {k:"B", t:"Emergency Policy"},
        {k:"C", t:"High Intensity"},
        {k:"D", t:"Soft Boundaries"}
      ],
      correct:["A", "D"],
      explanation:
`**Why A is right.** Customer First is documented with the exact weighting this requirement asks for: "Appointments are graded first by the customer's selection of a preferred employee and then by the ability to schedule the appointment as soon as possible. Travel minimization is the second priority." That's a direct match — preferred-resource commitment ranked first, prompt (ASAP) service ranked second.

**Why D is right.** Soft Boundaries is documented as "identical to the Customer First policy, but allows the sharing of employees between territories to enhance service coverage." Since it carries the same core objective weighting — preferred employee first, ASAP second — it satisfies the same customer-satisfaction requirement, with the added flexibility of letting resources cross territory lines when needed to still honor that preferred-resource/prompt-service goal.

**Why B is wrong.** Emergency is built for a different purpose entirely — it's "used with the Emergency Chatter action to dispatch emergency service appointments," an ad-hoc urgent-dispatch tool, not a policy oriented around committing named preferred resources to specific accounts for routine service.

**Why C is wrong.** High Intensity explicitly deprioritizes what this requirement is asking for: it's "typically used in times of high service volumes, like a storm scenario, where your need for employee productivity is higher priority than customer preferences." That's the opposite of favoring a customer's preferred resource.`,
      sources:[
        {l:"Create and Manage Field Service Scheduling Policies — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=pfs_scheduling.htm&type=0"},
        {l:"Scheduling Policies: A Comprehensive Overview — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies"}
      ]
    },
    {
      topic:"Field Service Mobile App",
      select:2,
      prompt:"The System Administrator at A Company creates custom actions on the Work Order object. Field technicians report that the actions are visible while using the Salesforce Mobile App but not visible in the Field Service Mobile App. What are two reasons why the actions only display in the Salesforce Mobile App? (Select all that apply)",
      options:[
        {k:"A", t:"The action was added as part of the Salesforce mobile navigation settings options."},
        {k:"B", t:"The actions were not added to the classic Publisher Quick Actions section on the Page Layout."},
        {k:"C", t:"The actions were not added to the Mobile and Lightning Actions section on the Page Layout."},
        {k:"D", t:"The action type being utilized on the Work Order object is Lightning Component."}
      ],
      correct:["C", "D"],
      explanation:
`**Why C is right.** Salesforce's own Field Service Mobile App setup guide is specific about where a quick action must live: it has to be dragged into the Quick Actions section that actions and Lightning pages use (the "Mobile and Lightning Actions" section on the layout) — the same section modern Lightning surfaces read from. If the admin added the action somewhere else on the layout instead of that section, the Field Service Mobile App simply won't find it there, even though the standard Salesforce Mobile App — which reads more broadly — can still surface it.

**Why D is right.** The Field Service Mobile App restricts which quick action *types* it will render at all: "The app supports quick actions of the types Create a Record, Update a Record, and Lightning Web Components. Other action types aren't supported." A Lightning Component (Aura) action is explicitly one of those unsupported "other" types — it renders fine in the standard Salesforce Mobile App (which supports Aura-based actions broadly), but the Field Service Mobile App will simply skip it. Rebuilding the same functionality as a Lightning Web Component action is the fix.

**Why A is wrong.** Salesforce's Mobile Navigation settings control the app-level tab/menu list of the Salesforce Mobile App — an entirely separate configuration from record-level Quick Actions on an object's page layout. Since the requirement here is about custom actions on the Work Order *record*, not app-wide navigation items, this setting isn't what would cause a Work Order action to appear or disappear.

**Why B is wrong.** The classic Publisher Quick Actions section belongs to Salesforce Classic's feed publisher — a legacy surface neither the modern Salesforce Mobile App nor the Field Service Mobile App actually reads actions from. Not adding an action there has no bearing on Lightning-based mobile visibility either way, so it doesn't explain the discrepancy described.`,
      sources:[
        {l:"Create Quick Actions for the Field Service Mobile App — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.mfs_quick_actions.htm&language=en_US&type=5"},
        {l:"Add LWC Components to FSL Mobile App — Salesforce Asim", u:"https://www.salesforceasim.com/post/add-lwc-components-to-fsl-mobile-app"}
      ]
    },
    {
      topic:"Entitlements & Milestones",
      select:3,
      prompt:"A Company wants to implement Service Level Agreement (SLA) for Work Orders. Which three considerations should the Consultant take into account? (Select all that apply)",
      options:[
        {k:"A", t:"A new Entitlement Process requires selecting a single Entitlement Process Type."},
        {k:"B", t:"Milestones for Work Orders can be configured in Setup."},
        {k:"C", t:"An Entitlements Process must be applied to both Cases and Work Orders."},
        {k:"D", t:"Milestones for Work Orders can be set up from Metadata API."}
      ],
      correct:["A", "B", "D"],
      explanation:
`**Why A is right.** An Entitlement Process is scoped to exactly one object type at creation — Salesforce's own guidance is direct: "Entitlement processes only run on records that match their type—so you can't use the same entitlement process for cases and work orders." A Consultant implementing Work Order SLAs has to build (or clone) a dedicated Work Order-type process; the org's existing Case entitlement process can't simply be reused.

**Why B is right.** Milestones are created declaratively from Setup — enter "Milestones" in Quick Find under Entitlement Management, click New Milestone, name it, and choose a recurrence type. That master milestone record is then attached to whichever Entitlement Process (Case or Work Order) needs it, so a Consultant can absolutely configure Work Order milestones point-and-click in Setup.

**Why D is right.** Both EntitlementProcess and MilestoneType are real, documented Metadata API types, meaning the same Work Order SLA configuration — the process, its milestones, and their settings — can be defined and deployed as metadata (via Metadata API, Change Sets built on it, or DX) rather than clicked together by hand in every org. That's a real, standard alternative path a Consultant should keep in mind for repeatable, deployable configuration across sandboxes and production.

**Why C is wrong.** This is the direct opposite of how entitlement processes work. Since "you can't use the same entitlement process for cases and work orders," a single process is never applied to *both* — a Consultant sets up one process for Cases and a separate one for Work Orders when both objects need SLA tracking.`,
      sources:[
        {l:"Use Entitlements with Work Orders — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders"},
        {l:"Set Up Support Milestones — Trailhead", u:"https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/set-up-milestones"}
      ]
    },
    {
      topic:"Licensing & Permissions",
      select:1,
      prompt:"An employee at A Company performs the role of a Dispatcher and a Technician. How should a Consultant configure Salesforce Field Service to support this behavior?",
      options:[
        {k:"A", t:"Create one Service Resource and assign the relevant Permission Set Licenses."},
        {k:"B", t:"Create two Skills records and assign them to the Service Resource record."},
        {k:"C", t:"Create one Service Resource and assign the Technician and Dispatcher role."},
        {k:"D", t:"Create two Service Resources and assign them to the employee."}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** A Service Resource represents one person and links back to exactly one underlying User record, but that User is free to hold multiple Field Service permission set licenses at once — nothing prevents assigning both the Field Service Dispatcher license (access to the Dispatch Console) and the Field Service Scheduling/Mobile license (so the same person can be scheduled and use the mobile app as a technician) to a single user. Layering both licenses — and their matching permission sets — onto the one Service Resource is exactly how Salesforce models a person who wears both hats, without fragmenting their identity into separate records.

**Why B is wrong.** Skills represent job competencies used for scheduling/qualification matching (electrical, plumbing, welding) — they're unrelated to system access or the Dispatcher-vs-Technician distinction, which is governed by licenses and permission sets, not Skill records.

**Why C is wrong.** There's no "Role" field on Service Resource that you assign values like "Technician" and "Dispatcher" to. Access to the Dispatcher Console versus the mobile app is controlled at the User level through Permission Set Licenses and Permission Sets, not a role picklist on the Service Resource record.

**Why D is wrong.** Service Resource is meant to be a single representation of one person tied to one User. Creating two Service Resources for the same employee would duplicate that person on the Gantt, fragment their skills/absences/scheduling history across two records, and create confusion about which resource actually represents them — the correct approach is one Service Resource carrying both sets of access.`,
      sources:[
        {l:"Field Service Permission Set Licenses — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_perm_set_licenses.htm&type=5"},
        {l:"Create Service Resources for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_resources.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Dispatcher Console & Gantt",
      select:1,
      prompt:"A Company provides prompt service and has multiple service levels for different customers. Over 50% of Service Appointments created on the same day that they need to completed. As a result, a Technician's daily schedule can change multiple times throughout the day. Which method of dispatching should a Consultant recommend implementing?",
      options:[
        {k:"A", t:"Automatically change the Status to Dispatched of all Service Appointments."},
        {k:"B", t:"Automatically Dispatch Service Appointments using Drip Feed."},
        {k:"C", t:"Automatically schedule unscheduled services to available Resources."},
        {k:"D", t:"Automatically change the Scheduling Policy."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** This is the textbook Drip Feed scenario — Salesforce documents it as: "When your schedule changes frequently, drip feed helps to prevent confusion because it waits to dispatch another appointment until the current one is complete." With over half of appointments booked same-day and a schedule reshuffling repeatedly throughout the day, pushing a technician's full queue to their mobile app up front just guarantees confusion as things keep changing underneath them. Drip Feed instead keeps only a small, controlled number of appointments (an Administrator-set default, e.g., one or two) dispatched at a time per technician, automatically releasing the next one as each is completed — matching a volatile, same-day-heavy schedule far better than dispatching everything at once.

**Why A is wrong.** Blanket-flipping every Service Appointment to Dispatched regardless of readiness doesn't solve the actual problem — it would push the technician's entire, still-shifting daily queue to them at once, which is exactly the confusion the frequent same-day changes are causing.

**Why C is wrong.** Auto-scheduling unscheduled appointments to available resources is a scheduling concern (getting appointments assigned to a time/resource in the first place), not a dispatching concern (controlling how many already-scheduled appointments a technician sees pushed to their queue at once). It doesn't address the volatility described.

**Why D is wrong.** Changing the Scheduling Policy affects which work rules and service objectives govern *how* appointments get matched to resources — it has no bearing on how many dispatched appointments show up in a technician's queue at a given moment, which is the actual pain point here.`,
      sources:[
        {l:"Drip Feed Field Service Appointments — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.pfs_dispatch_drip_feed.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Territories & Hours",
      select:2,
      prompt:"A Company just started its Field Service Implementation and is configuring Service Territories and Locations. The Locations need to be associated to Territories. In which two ways should the Consultant show this relationship? Choose 2 answers",
      options:[
        {k:"A", t:"Create the Service Territory Location as a Location Lookup field."},
        {k:"B", t:"Create the Service Territory Location as a Service Territory lookup field."},
        {k:"C", t:"Add the Service Territory Location Related List on the Location page layout."},
        {k:"D", t:"Add the Service Territory Location Related List on the Service Territory page layout."}
      ],
      correct:["C", "D"],
      explanation:
`**Why C and D are right.** Service Territory Location is a dedicated junction object that already ships with both a LocationId lookup ("the location that is associated with the service territory") and a ServiceTerritoryId lookup ("the associated service territory") built in — Salesforce's own guidance points Consultants straight at it: "Associate location records with service territories from the Service Territory Locations related list." Because it's a junction between two parent objects, that related list is exposed on both sides — adding it to the Location page layout lets someone see which territories a given site/warehouse/van belongs to, and adding it to the Service Territory page layout lets someone see every location tied to that territory. Together, C and D are the two declarative places a Consultant surfaces the same underlying relationship.

**Why A and B are wrong.** Both misdescribe the object model — Service Territory Location isn't something a Consultant "creates as" a single lookup field on the parent record; it's already a standalone junction object whose LocationId and ServiceTerritoryId lookup fields exist out of the box. There's no configuration step where you build a new "Service Territory Location" field on Location or on Service Territory — the actual, real action available is exposing the existing junction object's related list on each parent's layout, which is what C and D describe.`,
      sources:[
        {l:"Guidelines for Creating Service Territories for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5"},
        {l:"ServiceTerritoryLocation — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_serviceterritorylocation.htm"}
      ]
    },
    {
      topic:"Entitlements & Case Management",
      select:1,
      prompt:"A Company currently tracks its customers' entitlements to support utilizing Salesforce Service Cloud. Service calls that require a Technician to go to the customer's location require the creation of a Work Order. Once the Agent confirms that the Customer and product are eligible for on-site support, a Work Order is manually created. On which object should the Consultant define a Quick Action to create the Work Order?",
      options:[
        {k:"A", t:"Case"},
        {k:"B", t:"Contact"},
        {k:"C", t:"Entitlement"},
        {k:"D", t:"Opportunity"}
      ],
      correct:["A"],
      explanation:
`**Why A is right.** The whole flow described lives on the Case: a Service Cloud Agent is working a Case, checks the customer's Entitlement to confirm eligibility for on-site support, and only then decides a Work Order is needed. Salesforce's own data model builds a direct lookup for exactly this handoff — WorkOrder.CaseId, "the case associated with the work order" — so a Work Order is meant to be spun up from its parent Case. Putting a "Create a Record" Quick Action for Work Order on the Case page layout lets the Agent generate the Work Order in one click from the record they're already working, with the Case relationship (and by extension the Case's Account, Contact, and Entitlement context) carried over automatically.

**Why B, C, and D are wrong.** Contact is just the customer's contact record — it has no process-driven reason to spawn a Work Order and isn't where the Agent is confirming eligibility. Entitlement is the policy/eligibility record itself (what support the customer is owed), not the working record an Agent acts from when deciding to escalate to on-site service — Entitlements get *referenced* by Cases and Work Orders, they aren't the launch point for creating one. Opportunity belongs to the sales process (pipeline, deals) and has no natural relationship to a support Work Order at all. Only Case matches both the described workflow and the actual CaseId lookup Work Order provides for it.`,
      sources:[
        {l:"WorkOrder — Field Service Developer Guide", u:"https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_workorder.htm"},
        {l:"Entitlement Management Overview — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.entitlements_overview.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Crew Management",
      select:2,
      prompt:"A Company wants to use crews to service its customers. A Company's consultant recommends using the Crew Management tool to create and maintain the crews, and indicates that access to the tool is given via a permission set. Which two Permission Sets should give access to the Crew Management tool? Choose 2 answers",
      options:[
        {k:"A", t:"FSL Resource Permissions"},
        {k:"B", t:"FSL Admin Permissions"},
        {k:"C", t:"FSL Agent Permissions"},
        {k:"D", t:"FSL Dispatcher Permissions"}
      ],
      correct:["B","D"],
      explanation:
`**Why B and D are right.** Salesforce's own "Set Up Crew Management" documentation names these two permission sets directly: "Ensure that each user has at least one of these permission sets: FSL Admin Permissions, FSL Dispatcher Permissions." Both roles have a legitimate reason to build and maintain crews — an Admin configuring the org's Field Service setup, and a Dispatcher who needs to adjust crew composition on the fly (for example, adding a missing skill to a crew already assigned to a job) — so Salesforce grants Crew Management tool access to whichever of the two permission sets a user holds.

**Why A and C are wrong.** FSL Resource Permissions is the permission set for the actual field technicians (Service Resources) doing the on-site work through the Field Service Mobile App — it's scoped to that mobile, execution-focused persona, not to the administrative Crew Management tool. FSL Agent Permissions is scoped to Service Cloud agents handling cases and creating Work Orders from the contact center — a call-center role with no documented tie to building or maintaining Service Crews. Neither appears in Salesforce's list of permission sets that unlock the Crew Management tool.`,
      sources:[
        {l:"Set Up Crew Management — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.pfs_set_up_crew_management.htm&language=en_US&type=5"},
        {l:"Create Service Crews for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_create_crews.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Maintenance Plans",
      select:1,
      prompt:"A Company wants to offer customers a Maintenance Plan that provides 12 monthly checkups. The customer will call to schedule each visit. How should a Consultant configure the Maintenance Plan to meet this requirement?",
      options:[
        {k:"A", t:"Set the Frequency to 1 Month; Generation Timeframe for 12; check Auto-generate Work Orders."},
        {k:"B", t:"Set Frequency to 1 Month; Generation Timeframe of 1; check Auto-generate Work Orders."},
        {k:"C", t:"Set Frequency to 1 Month; Generation Timeframe of 1; uncheck Auto-generate Work Orders."},
        {k:"D", t:"Set Frequency to 1 Month; Generation Timeframe of 12; uncheck Auto-generate Work Orders."}
      ],
      correct:["B"],
      explanation:
`**Why B is right.** Salesforce's own guidance on generating Work Orders from a Maintenance Plan spells out how the batch size is actually calculated: "Generation timeframe: determines how far into the future work orders are generated," worked through with a concrete example — "with a generation timeframe of 1 year, a frequency of 2 months, and two maintenance assets, one batch contains 14 work orders." That means Frequency sets the spacing between visits, while Generation Timeframe sets how far ahead *each batch* reaches — so Frequency = 1 Month with Generation Timeframe = 1 produces exactly one Work Order per batch, one month at a time, instead of dumping all 12 visits onto the account at once. Checking Auto-generate Work Orders then makes that rolling, one-month-ahead batch happen automatically every cycle for the life of the 12-month plan — no admin has to remember to click Generate Work Orders every month. Salesforce even frames this exact trade-off directly: "Automatic generation provides the assurance that you're delivering the maintenance you promised to your customer," which is precisely the promise a 12-visit contract makes. The customer still calls in each month to actually schedule the newly generated visit — that's a Service Appointment scheduling action, separate from and unaffected by how the Work Order itself got created.

**Why A is wrong.** Generation Timeframe of 12 covers a full year in a single batch — all 12 Work Orders (and their unscheduled Service Appointments) would be created immediately, sitting on the account for a year before most of them are even needed. That's unnecessary clutter and defeats the point of a rolling, month-by-month cadence tied to when the customer actually calls.

**Why C is wrong.** Unchecking Auto-generate Work Orders means Salesforce "prohibits the manual generation of work orders via the Generate Work Orders action" from happening automatically — someone would have to manually click Generate Work Orders every single month for a year to keep the plan on track. That's operationally fragile and contradicts Salesforce's own framing that automatic generation is what "provides the assurance that you're delivering the maintenance you promised."

**Why D is wrong.** This combines both problems at once — Generation Timeframe of 12 front-loads all 12 visits in one batch, and unchecking Auto-generate means that front-loaded batch would have to be triggered by hand rather than happening on its own, offering neither the rolling cadence nor the reliability the scenario calls for.`,
      sources:[
        {l:"Guidelines for Generating Work Orders from a Maintenance Plan — Salesforce Help", u:"https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_generate_work_orders_plan.htm&type=5"},
        {l:"Maintenance Plan Fields — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=sf.fs_maintenance_fields.htm&language=en_US&type=5"}
      ]
    },
    {
      topic:"Work Types",
      select:3,
      prompt:"Which three objects are associated to the Work Type? Choose 3 answers",
      options:[
        {k:"A", t:"Resources"},
        {k:"B", t:"Skill Requirements"},
        {k:"C", t:"Product Required"},
        {k:"D", t:"Articles"},
        {k:"E", t:"Service Appointments"}
      ],
      correct:["B","C","D"],
      explanation:
`**Why B, C, and D are right.** Salesforce's own hands-on Work Type walkthrough builds all three of these directly onto the Work Type record as configurable related lists: "In the Skill Required list, select..." to add a required skill (B), "In the Products Required related list, click New" to attach a needed part (C), and it explicitly documents Linked Articles on Work Type too — "A work type's attached articles show up on work orders and work order line items that use the work type" (D). All three are things a Consultant actually configures on the Work Type record itself so that every Work Order or Work Order Line Item built from that template automatically inherits the right skills, parts, and reference articles.

**Why A is wrong.** Service Resources (technicians, crews, dispatchers) have no lookup or related list tying them to a Work Type at all — a resource gets matched to a job through Skill Requirements comparing the resource's own Skills against what the Work Type/Work Order calls for, not through any direct Work Type-to-Resource relationship.

**Why E is wrong.** Service Appointment does carry a read-only Work Type field, but it's explicitly documented as an *inherited*, downstream value — "the work type is inherited from the appointment's parent record if the parent is a work order or work order line item" — not something configured on the Work Type record. Work Type's own "Auto-Create Service Appointment" setting is a checkbox that triggers appointment generation as an outcome, not a related list you populate on the Work Type the way Skill Requirements, Products Required, and Linked Articles are.`,
      sources:[
        {l:"Creating Work Types for Field Service in Salesforce — Trailhead", u:"https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type"},
        {l:"Service Appointment Fields for Field Service — Salesforce Help", u:"https://help.salesforce.com/s/articleView?id=service.fs_appointment_fields.htm&language=en_US&type=5"}
      ]
    }
  ];

  const SELECT_WORD = {1:"Select one", 2:"Select two", 3:"Select three"};

  const STORAGE_KEY = "fsConsultantQuizState_v1";

  const arraysEqualAsSets = (a, b) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  };

  // Fisher-Yates shuffle — never mutates the input array.
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // A shuffled permutation of DATA's indices — the order tickets are displayed in.
  const buildOrder = () => shuffleArray(DATA.map((_, i) => i));

  const freshState = () => ({
    index:0,
    finished:false,
    order: buildOrder(),
    answers:DATA.map(() => ({selected:new Set(), checked:false, correct:null}))
  });

  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return freshState();
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== DATA.length) {
        return freshState();
      }
      const answers = saved.answers.map((a) => ({
        selected: new Set(Array.isArray(a.selected) ? a.selected : []),
        checked: !!a.checked,
        correct: a.correct === true ? true : (a.correct === false ? false : null)
      }));

      // Nothing attempted yet — deal a freshly shuffled deck on every reload.
      // Once at least one ticket is checked, the deck order freezes so a
      // reload resumes the exact same shuffle instead of scrambling it again.
      const anyTraversed = answers.some((a) => a.checked);
      if (!anyTraversed) {
        return { index:0, finished:false, order: buildOrder(), answers };
      }

      const validOrder = Array.isArray(saved.order)
        && saved.order.length === DATA.length
        && new Set(saved.order).size === DATA.length
        && saved.order.every((v) => Number.isInteger(v) && v >= 0 && v < DATA.length);

      return {
        index: Math.max(0, Math.min(DATA.length - 1, Number(saved.index) || 0)),
        finished: !!saved.finished,
        order: validOrder ? saved.order : buildOrder(),
        answers
      };
    } catch (e) {
      return freshState();
    }
  };

  const state = loadState();

  const saveState = () => {
    try {
      const serializable = {
        index: state.index,
        finished: state.finished,
        order: state.order,
        answers: state.answers.map((a) => ({
          selected: [...a.selected],
          checked: a.checked,
          correct: a.correct
        }))
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      // Storage unavailable (private browsing, quota, etc.) — fail silently, quiz still works in-memory.
    }
  };

  // Deals a brand-new shuffled ticket order, back to the first position. Used
  // whenever the deck should reshuffle (finishing the whole set, or an
  // explicit full reset).
  const reshuffleDeck = () => {
    state.order = buildOrder();
    state.index = 0;
  };

  const els = {
    stats: document.getElementById("stats"),
    queue: document.getElementById("queue"),
    ticket: document.getElementById("ticket"),
    shift: document.getElementById("shift")
  };

  const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const mdToHtml = (md) => md.split(/\n\n+/).map((p) => {
    const withBold = esc(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return `<p>${withBold}</p>`;
  }).join("");

  const toggleSelect = (qi, key) => {
    const a = state.answers[qi];
    if (a.checked) return;
    const q = DATA[qi];
    if (q.select === 1) {
      a.selected = new Set([key]);
    } else if (a.selected.has(key)) {
      a.selected.delete(key);
    } else {
      a.selected.add(key);
    }
    saveState();
    renderTicket();
  };

  const checkAnswer = (qi) => {
    const a = state.answers[qi];
    const q = DATA[qi];
    if (a.selected.size !== q.select) return;
    a.checked = true;
    a.correct = arraysEqualAsSets([...a.selected], q.correct);
    saveState();
    renderAll();
  };

  const resetOne = (qi) => {
    state.answers[qi] = {selected:new Set(), checked:false, correct:null};
    saveState();
    renderAll();
  };

  const goTo = (i) => {
    state.index = Math.max(0, Math.min(state.order.length - 1, i));
    state.finished = false;
    saveState();
    renderAll();
    document.getElementById("ticket")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const finishQuiz = () => {
    state.finished = true;
    reshuffleDeck();
    saveState();
    renderAll();
    document.getElementById("shift")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  // Re-queues only the tickets that were answered incorrectly, clears their
  // prior selection so they can be attempted fresh, and drops back into the
  // ticket view starting at the first one. Correctly-answered tickets are
  // left untouched — once every missed ticket is checked again, "End of
  // shift" naturally reappears (it triggers off the full DATA set, not the
  // review-only queue) with the updated score.
  const reviewErrors = (wrongOriginalIdx) => {
    if (!wrongOriginalIdx || !wrongOriginalIdx.length) return;
    wrongOriginalIdx.forEach((qi) => {
      state.answers[qi] = {selected:new Set(), checked:false, correct:null};
    });
    state.order = wrongOriginalIdx;
    state.index = 0;
    state.finished = false;
    saveState();
    renderAll();
    document.getElementById("ticket")?.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const renderStats = () => {
    const total = DATA.length;
    let resolved = 0, correct = 0;
    for (const a of state.answers) {
      if (a.checked) {
        resolved++;
        if (a.correct) correct++;
      }
    }
    const acc = resolved ? `${Math.round((correct / resolved) * 100)}%` : "—";
    els.stats.innerHTML = `
      <div class="stat"><span class="num mono">${resolved} / ${total}</span><span class="lbl">Resolved</span></div>
      <div class="stat"><span class="num mono">${correct}</span><span class="lbl">Correct</span></div>
      <div class="stat"><span class="num mono">${acc}</span><span class="lbl">Accuracy</span></div>`;
  };

  const renderQueue = () => {
    els.queue.innerHTML = state.order.map((qi, pos) => {
      const a = state.answers[qi];
      const classes = ["chip"];
      if (pos === state.index) classes.push("current");
      if (a.checked) classes.push(a.correct ? "correct" : "wrong");
      return `<button class="${classes.join(" ")}" data-i="${pos}" aria-label="Ticket ${pos + 1}">${pos + 1}</button>`;
    }).join("");
    els.queue.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => goTo(parseInt(btn.dataset.i, 10)));
    });
  };

  const renderTicket = () => {
    const i = state.index;
    const qi = state.order[i];
    const q = DATA[qi];
    const a = state.answers[qi];
    const isLastTicket = i === state.order.length - 1;

    const badgeHtml = !a.checked
      ? `<span class="badge open">Open</span>`
      : a.correct
        ? `<span class="badge good">Resolved — Correct</span>`
        : `<span class="badge bad">Resolved — Review</span>`;

    const optionsHtml = q.options.map((opt) => {
      const picked = a.selected.has(opt.k);
      const classes = ["opt"];
      let flag = "";
      if (picked && !a.checked) classes.push("picked");
      if (a.checked) {
        const isCorrectOpt = q.correct.includes(opt.k);
        if (picked && isCorrectOpt) { classes.push("reveal-correct"); flag = `<span class="opt-flag">✓ correct</span>`; }
        else if (picked && !isCorrectOpt) { classes.push("reveal-wrong"); flag = `<span class="opt-flag">✕ incorrect</span>`; }
        else if (!picked && isCorrectOpt) { classes.push("reveal-missed"); flag = `<span class="opt-flag">✓ should be selected</span>`; }
      }
      const markClasses = ["mark", "mono", ...(q.select === 1 ? ["circle"] : [])].join(" ");
      const markContent = a.checked
        ? (q.correct.includes(opt.k) ? "✓" : (picked ? "✕" : opt.k))
        : opt.k;
      return `<button type="button" class="${classes.join(" ")}" data-k="${opt.k}" ${a.checked ? "disabled" : ""}><span class="${markClasses}">${markContent}</span><span class="opt-text">${esc(opt.t)}</span>${flag}</button>`;
    }).join("");

    const resultBanner = !a.checked
      ? ""
      : a.correct
        ? `<div class="result-banner good">Correct — matches Salesforce documentation.</div>`
        : `<div class="result-banner bad">Not quite — read the resolution notes below.</div>`;

    const resolutionHtml = !a.checked ? "" : (() => {
      const refsHtml = q.sources.map((s) => `<a class="ref" href="${s.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/></svg>${esc(s.l)}</a>`).join("");
      return `<div class="resolution"><h3>Resolution notes</h3>${mdToHtml(q.explanation)}<div class="refs"><span class="ref-label">Attached knowledge articles</span>${refsHtml}</div></div>`;
    })();

    const actionsHtml = !a.checked
      ? `<div class="actions"><button class="btn" id="checkBtn" ${a.selected.size === q.select ? "" : "disabled"}>Check answer</button><span class="count-hint mono">${a.selected.size} of ${q.select} selected</span></div>`
      : `<div class="actions"><button class="btn ghost" id="tryAgainBtn">Try again</button></div>`;

    els.ticket.innerHTML = `
      <div class="perf"></div>
      <div class="ticket-head">
        <div>
          <span class="ticket-id mono">TICKET #${String(i + 1).padStart(2, "0")} OF ${state.order.length}</span><br>
          <span class="ticket-topic">${esc(q.topic)}</span>
        </div>
        ${badgeHtml}
      </div>
      <p class="prompt">${esc(q.prompt)}</p>
      <span class="select-hint">${SELECT_WORD[q.select]}${q.select > 1 ? ` (${q.select})` : ""}</span>
      ${resultBanner}
      <div class="options">${optionsHtml}</div>
      ${actionsHtml}
      <div class="ticketnav">
        <button class="btn ghost" id="prevBtn" ${i === 0 ? "disabled" : ""}>‹ Previous</button>
        <span class="pos mono">${i + 1} / ${state.order.length}</span>
        <button class="btn ghost" id="nextBtn">${isLastTicket ? "Finish" : "Next ›"}</button>
      </div>
      ${resolutionHtml}`;

    els.ticket.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => toggleSelect(qi, btn.dataset.k));
    });
    document.getElementById("checkBtn")?.addEventListener("click", () => checkAnswer(qi));
    document.getElementById("tryAgainBtn")?.addEventListener("click", () => resetOne(qi));
    document.getElementById("prevBtn").addEventListener("click", () => goTo(i - 1));
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (isLastTicket) { finishQuiz(); } else { goTo(i + 1); }
    });
  };

  const renderShift = () => {
    const total = DATA.length;
    const resolved = state.answers.filter((a) => a.checked).length;
    if (resolved < total) { els.shift.innerHTML = ""; return; }

    const correct = state.answers.filter((a) => a.correct).length;
    const wrongOriginalIdx = state.answers.reduce((acc, a, qi) => (a.correct ? acc : [...acc, qi]), []);
    const pct = Math.round((correct / total) * 100);

    const reviewHtml = wrongOriginalIdx.length
      ? `<div class="review-chips">${wrongOriginalIdx.map((qi) => {
          const pos = state.order.indexOf(qi);
          return `<button class="chip mono" data-i="${pos}" style="width:auto;padding:0 10px;">Ticket ${pos + 1}</button>`;
        }).join("")}</div>`
      : `<p style="margin:0;">Every ticket resolved correctly.</p>`;

    const reviewErrorsBtnHtml = wrongOriginalIdx.length
      ? `<button class="btn" id="reviewErrorsBtn" style="margin-top:14px;">Review errors (${wrongOriginalIdx.length})</button>`
      : "";

    els.shift.innerHTML = `
      <div class="shift">
        <h2>End of shift</h2>
        <p>All ${total} tickets resolved.</p>
        <div class="score-line">Score: ${correct}/${total} - ${pct}%</div>
        <div class="row">
          <div><div class="num">${correct} / ${total}</div><div class="lbl">Correct</div></div>
          <div><div class="num">${pct}%</div><div class="lbl">Accuracy</div></div>
        </div>
        ${wrongOriginalIdx.length ? `<span class="ref-label" style="margin-bottom:8px;display:block;">Tickets to review</span>` : ""}
        ${reviewHtml}
        ${reviewErrorsBtnHtml}
      </div>`;

    els.shift.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => goTo(parseInt(btn.dataset.i, 10)));
    });
    document.getElementById("reviewErrorsBtn")?.addEventListener("click", () => reviewErrors(wrongOriginalIdx));
  };

  const renderAll = () => {
    renderStats();
    renderQueue();
    renderTicket();
    renderShift();
    document.getElementById("ticketCount").textContent = `${DATA.length} tickets · compiled from session transcript`;

    els.stats.style.display = state.finished ? "none" : "";
    els.queue.style.display = state.finished ? "none" : "";
    els.ticket.style.display = state.finished ? "none" : "";
  };

  document.getElementById("resetAll").addEventListener("click", () => {
    state.finished = false;
    state.answers = DATA.map(() => ({selected:new Set(), checked:false, correct:null}));
    reshuffleDeck();
    saveState();
    renderAll();
  });

  // ---------- Export (Word doc / PDF) — original DATA order, questions +
  // suggested answers + correct answers only, no explanations or sources.

  const buildExportRowsHtml = () => DATA.map((q, idx) => {
    const optionsHtml = q.options.map((o) => `<div class="pq-opt">${esc(o.k)}. ${esc(o.t)}</div>`).join("");
    const correctLabel = q.correct.length > 1 ? "Correct answers" : "Correct answer";
    return `
      <div class="pq">
        <p class="pq-num">Question ${idx + 1}</p>
        <p class="pq-topic">${esc(q.topic)}</p>
        <p class="pq-prompt">${esc(q.prompt)}</p>
        <div class="pq-options">${optionsHtml}</div>
        <p class="pq-correct">${correctLabel}: ${esc(q.correct.join(", "))}</p>
      </div>`;
  }).join("");

  const buildExportBodyHtml = () => `
    <h1>Salesforce Certified Agentforce Field Service and Operations</h1>
    <p class="print-meta">Practice questions — ${DATA.length} total.</p>
    ${buildExportRowsHtml()}`;

  const exportWord = () => {
    const doc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Field Service Consultant — Practice Questions</title>
<style>
  body{ font-family: Calibri, Arial, sans-serif; font-size:12pt; color:#111; }
  h1{ font-size:18pt; margin:0 0 4px; }
  .print-meta{ font-size:10pt; color:#555; margin:0 0 24px; }
  .pq{ margin:0 0 20px; }
  .pq-num{ font-weight:700; margin:0 0 2px; }
  .pq-topic{ font-size:9pt; text-transform:uppercase; letter-spacing:0.05em; color:#666; margin:0 0 6px; }
  .pq-prompt{ font-weight:600; margin:0 0 8px; }
  .pq-options{ margin:0 0 8px 18px; }
  .pq-opt{ margin:2px 0; }
  .pq-correct{ margin:0; font-weight:700; }
</style></head>
<body>${buildExportBodyHtml()}</body></html>`;
    const blob = new Blob(["﻿", doc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Field-Service-Consultant-Practice-Questions.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const exportPdf = () => {
    const printArea = document.getElementById("printExport");
    printArea.innerHTML = buildExportBodyHtml();
    document.body.classList.add("printing-export");
    const cleanup = () => {
      document.body.classList.remove("printing-export");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  };

  const exportMenu = document.getElementById("exportMenu");
  const exportBtn = document.getElementById("exportBtn");
  const exportMenuList = document.getElementById("exportMenuList");

  const closeExportMenu = () => {
    if (!exportMenuList) return;
    exportMenuList.hidden = true;
    exportBtn?.setAttribute("aria-expanded", "false");
  };
  const openExportMenu = () => {
    if (!exportMenuList) return;
    exportMenuList.hidden = false;
    exportBtn?.setAttribute("aria-expanded", "true");
  };

  exportBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (exportMenuList?.hidden) openExportMenu();
    else closeExportMenu();
  });
  document.getElementById("exportPdfBtn")?.addEventListener("click", () => {
    closeExportMenu();
    exportPdf();
  });
  document.getElementById("exportWordBtn")?.addEventListener("click", () => {
    closeExportMenu();
    exportWord();
  });
  document.addEventListener("click", (e) => {
    if (exportMenu && !exportMenu.contains(e.target)) closeExportMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeExportMenu();
  });

  renderAll();
})();
