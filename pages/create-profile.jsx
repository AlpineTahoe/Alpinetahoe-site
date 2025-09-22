import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CreateProfilePage() {
  const BASE_ADDRESS = "12994 Palisade St, Truckee, CA 96161";

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    service: '',
    appointmentDate: '',
    travelDeposit: '',
  });

  const [calculatedDeposit, setCalculatedDeposit] = useState('');

  const services = [
    "General Acknowledgment",
    "Jurat / Oath",
    "Power of Attorney Signing",
    "Loan Document Signing",
    "Trusts & Estate Documents",
    "Real Estate Deeds / Transfers",
    "Medical Documents",
    "Apostille Facilitation",
    "Business Agreements",
    "Vehicle Title Transfers",
    "Loan Packages",
  ];

  const deposits = [
    { label: "Within 10 miles – $25", value: "25", maxMiles: 10 },
    { label: "10–25 miles – $40", value: "40", minMiles: 10, maxMiles: 25 },
    { label: "25–50 miles – $60", value: "60", minMiles: 25, maxMiles: 50 },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.address && form.city && form.state && form.zip) {
      // Example distance calculation
      const distance = 12; // placeholder, you can integrate real distance API later
      const depositTier = deposits.find(
        (d) => distance <= (d.maxMiles || Infinity) && distance >= (d.minMiles || 0)
      );
      if (depositTier) {
        setCalculatedDeposit(depositTier.value);
        setForm(prev => ({ ...prev, travelDeposit: depositTier.value }));
      }
    }
  }, [form.address, form.city, form.state, form.zip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.travelDeposit) {
      alert('Please pay travel deposit before booking your appointment.');
      return;
    }
    alert('Profile created and appointment booked!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-gray-800 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 tracking-wide">
        Create Your Profile & Book Appointment
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <Input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />
        <div className="grid grid-cols-3 gap-4">
          <Input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <Input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-
